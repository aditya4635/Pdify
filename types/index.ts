export interface CardSection {
  type: string;
  heading?: string;
  content?: string;
  bullets?: string[];
  items?: Array<{
    label: string;
    value: string;
  }>;
}

export interface Card1Content {
  sections?: CardSection[];
}

export interface Card2Content {
  keyPoints?: string[];
  description?: string;
}

export interface Card3Content {
  sections?: CardSection[];
  description?: string;
}

export interface Card4Content {
  metadata?: Array<{
    label: string;
    value: string;
  }>;
  keyTerms?: Array<{
    term: string;
    definition: string;
  }>;
  bottomLine?: string;
}

export interface CardData {
  card1?: Card1Content;
  card2?: Card2Content;
  card3?: Card3Content;
  card4?: Card4Content;
}

export interface Summary {
  id: string;
  original_file_url: string;
  title: string | null;
  created_at: string;
  summary_text: string;
  status: string;
  file_name?: string;
  card_data?: CardData;
}
