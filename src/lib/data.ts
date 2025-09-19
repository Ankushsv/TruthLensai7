export type LearningModule = {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    image: string;
    imageHint: string;
};

export const learningModules: LearningModule[] = [
    {
        id: '1',
        title: 'Identifying Fake News',
        description: 'Learn the common characteristics of fake news articles and how to spot them in the wild.',
        category: 'Media Literacy',
        status: 'In Progress',
        image: 'https://picsum.photos/seed/10/600/400',
        imageHint: 'magnifying glass news',
    },
    {
        id: '2',
        title: 'Understanding Bias',
        description: 'Explore different types of media bias and how they can influence your perspective.',
        category: 'Critical Thinking',
        status: 'Not Started',
        image: 'https://picsum.photos/seed/11/600/400',
        imageHint: 'balanced scale',
    },
    {
        id: '3',
        title: 'Source Vetting 101',
        description: 'A practical guide to evaluating the credibility of sources, from websites to social media accounts.',
        category: 'Fact-Checking',
        status: 'Completed',
        image: 'https://picsum.photos/seed/12/600/400',
        imageHint: 'official document',
    },
    {
        id: '4',
        title: 'The Psychology of Misinformation',
        description: 'Dive into why we fall for misinformation and the cognitive biases that make us vulnerable.',
        category: 'Critical Thinking',
        status: 'Not Started',
        image: 'https://picsum.photos/seed/13/600/400',
        imageHint: 'brain illustration',
    },
    {
        id: '5',
        title: 'Digital Footprints and Privacy',
        description: 'Understand how your data is used online and learn to protect your digital privacy.',
        category: 'Media Literacy',
        status: 'In Progress',
        image: 'https://picsum.photos/seed/14/600/400',
        imageHint: 'digital footprint',
    },
    {
        id: '6',
        title: 'Advanced Fact-Checking Techniques',
        description: 'Go beyond basic checks with tools for reverse image search, geolocation, and more.',
        category: 'Fact-Checking',
        status: 'Not Started',
        image: 'https://picsum.photos/seed/15/600/400',
        imageHint: 'detective tools',
    },
];

export type FactCheckArticle = {
    id: string;
    title: string;
    source: string;
    summary: string;
    url: string;
    date: string;
    tags: string[];
}

export const factCheckFeed: FactCheckArticle[] = [
    {
        id: 'fc1',
        title: 'Viral video of dancing robots is CGI, not real',
        source: 'Reuters Fact Check',
        summary: 'A video shared widely on social media platforms does not show real robots dancing, but is a computer-generated creation from a visual effects artist.',
        url: '#',
        date: '2024-07-20',
        tags: ['Technology', 'CGI'],
    },
    {
        id: 'fc2',
        title: 'No evidence that lemon water cures major diseases',
        source: 'AP Fact Check',
        summary: 'Claims that drinking lemon water can cure diseases like cancer are unfounded and lack scientific support. Health experts advise against using it as a substitute for medical treatment.',
        url: '#',
        date: '2024-07-19',
        tags: ['Health', 'Wellness'],
    },
    {
        id: 'fc3',
        title: 'Quote about "lazy generation" misattributed to ancient philosopher',
        source: 'Snopes',
        summary: 'A popular meme attributing a quote criticizing the youth to an ancient Greek philosopher is a modern fabrication. There is no record of the philosopher saying or writing this.',
        url: '#',
        date: '2024-07-18',
        tags: ['History', 'Quotes'],
    },
    {
        id: 'fc4',
        title: 'Image of a "blue moon" is digitally altered',
        source: 'PolitiFact',
        summary: 'A striking image of a vibrant blue moon is not a real photograph. The term "blue moon" refers to a calendrical phenomenon, not the moon\'s actual color.',
        url: '#',
        date: '2024-07-17',
        tags: ['Science', 'Space'],
    },
];
