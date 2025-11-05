/**
 * PLR Content Analyzer Service
 * Analyzes files for PLR indicators and extracts metadata
 */

export interface PLRAnalysisResult {
  isPLR: boolean;
  confidenceScore: number; // 0-100
  licenseType?: 'PLR' | 'MRR' | 'RR' | 'Personal Use' | 'Unknown';
  detectedKeywords: string[];
  suggestedCategory?: string;
}

const PLR_KEYWORDS = [
  'plr',
  'private label rights',
  'private label right',
  'resell rights',
  'resale rights',
  'master resale rights',
  'master resell rights',
  'mrr',
  'redistribution rights',
  'can be modified',
  'can be resold',
  'put your name on it',
  'claim authorship',
];

const LICENSE_PATTERNS = {
  PLR: ['private label rights', 'plr', 'claim authorship', 'put your name'],
  MRR: ['master resale', 'master resell', 'mrr'],
  RR: ['resell rights', 'resale rights', 'redistribution rights'],
  'Personal Use': ['personal use only', 'not for resale', 'non-commercial'],
};

const CATEGORY_KEYWORDS = {
  'Health & Wellness': ['health', 'wellness', 'fitness', 'diet', 'nutrition', 'exercise'],
  'Business & Marketing': ['business', 'marketing', 'entrepreneur', 'sales', 'seo', 'social media'],
  'Self-Help': ['self-help', 'motivation', 'mindset', 'success', 'personal development'],
  'Finance': ['finance', 'money', 'investing', 'budgeting', 'wealth'],
  'Technology': ['technology', 'software', 'programming', 'web', 'app'],
  'Parenting': ['parenting', 'children', 'kids', 'family'],
  'Relationships': ['relationship', 'dating', 'marriage', 'love'],
};

/**
 * Extract text content from a file
 */
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content || '');
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    // For text files, read as text
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      // For other files, we can't easily extract text in the browser
      // Return empty string and rely on filename analysis
      resolve('');
    }
  });
}

/**
 * Analyze content for PLR indicators
 */
export function analyzeContent(content: string, filename: string): PLRAnalysisResult {
  const lowerContent = content.toLowerCase();
  const lowerFilename = filename.toLowerCase();
  const combinedText = `${lowerContent} ${lowerFilename}`;

  // Detect keywords
  const detectedKeywords: string[] = [];
  let keywordMatches = 0;

  PLR_KEYWORDS.forEach((keyword) => {
    if (combinedText.includes(keyword)) {
      detectedKeywords.push(keyword);
      keywordMatches++;
    }
  });

  // Calculate confidence score (0-100)
  const baseScore = Math.min(keywordMatches * 15, 85); // Max 85 from keywords
  const filenameBonus = lowerFilename.includes('plr') ? 15 : 0;
  const confidenceScore = Math.min(baseScore + filenameBonus, 100);

  // Determine if it's PLR
  const isPLR = confidenceScore >= 30;

  // Detect license type
  let licenseType: PLRAnalysisResult['licenseType'] = 'Unknown';
  
  for (const [type, patterns] of Object.entries(LICENSE_PATTERNS)) {
    const hasMatch = patterns.some(pattern => combinedText.includes(pattern));
    if (hasMatch) {
      licenseType = type as PLRAnalysisResult['licenseType'];
      break;
    }
  }

  // Suggest category based on content
  let suggestedCategory: string | undefined;
  let maxCategoryScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const categoryScore = keywords.filter(keyword => 
      combinedText.includes(keyword)
    ).length;

    if (categoryScore > maxCategoryScore) {
      maxCategoryScore = categoryScore;
      suggestedCategory = category;
    }
  }

  return {
    isPLR,
    confidenceScore,
    licenseType: isPLR ? licenseType : undefined,
    detectedKeywords,
    suggestedCategory: maxCategoryScore > 0 ? suggestedCategory : undefined,
  };
}

/**
 * Analyze a file for PLR content
 */
export async function analyzePLRFile(file: File): Promise<PLRAnalysisResult> {
  try {
    // Extract text content if possible
    const content = await extractTextFromFile(file);

    // Analyze the content
    return analyzeContent(content, file.name);
  } catch (error) {
    console.error('Error analyzing file:', error);
    
    // Fallback to filename-only analysis
    return analyzeContent('', file.name);
  }
}

/**
 * Batch analyze multiple files
 */
export async function analyzePLRFiles(
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<Map<string, PLRAnalysisResult>> {
  const results = new Map<string, PLRAnalysisResult>();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await analyzePLRFile(file);
    results.set(file.name, result);

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
}
