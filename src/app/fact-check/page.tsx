import { factCheckFeed } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Rss } from 'lucide-react';

export default function FactCheckPage() {
    return (
        <div className="container mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
                    <Rss className="text-primary"/>
                    Fact-Checking Feed
                </h1>
                <p className="text-muted-foreground mt-2">
                    A curated feed of recent fact-checks from reputable sources.
                </p>
            </div>
            <div className="space-y-6">
                {factCheckFeed.map((article) => (
                    <Card key={article.id} className="transition-shadow hover:shadow-md flex flex-col sm:flex-row">
                        <div className="flex-grow">
                            <CardHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                    <Badge variant="secondary" className="hidden sm:inline-flex">{article.source}</Badge>
                                </div>
                                <CardDescription>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{article.summary}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">{tag}</Badge>
                                    ))}
                                </div>
                                <Badge variant="secondary" className="sm:hidden">{article.source}</Badge>
                            </CardFooter>
                        </div>
                        <div className="p-6 flex items-center border-t sm:border-t-0 sm:border-l">
                            <Button asChild>
                                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                    Read More <ExternalLink className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
