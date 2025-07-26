import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Take control of your finances with clarity and ease
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
          BudgetWise is your simple tool to track daily expenses and truly
          understand where your money goes.
        </p>
        <Button size="lg" className="mt-8 bg-blue-600" asChild>
          <Link href="/register">Get Started for Free</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Everything you need, nothing you don&apos;t.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>

              <CardTitle>Fast Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Log your expenses in seconds with our simple and intuitive
                interface.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                />
              </svg>

              <CardTitle>Clear Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Understand your spending habits with clear, easy-to-read
                summaries and charts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>

              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your financial data is yours alone. We ensure it&apos;s secure
                and always available to you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Testimonials Section */}
<section className="container mx-auto py-20 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-12">
    Trusted by users like you
  </h2>
  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    
    {/* Testimonial Card 1 */}
    <Card>
      <CardContent className="pt-6">
        <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
          &quot;Finally, a simple app that helps me see where my money is going. BudgetWise has been a game-changer for my freelance finances!&quot;
        </blockquote>
        <figure className="mt-4 text-right">
          <figcaption className="font-semibold">Sarah K.</figcaption>
          <p className="text-sm text-muted-foreground">Freelance Designer</p>
        </figure>
      </CardContent>
    </Card>

    {/* Testimonial Card 2 */}
    <Card>
      <CardContent className="pt-6">
        <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
          &quot;As a student, managing my small budget is crucial. This tool is incredibly easy to use and has helped me save more than I thought possible.&quot;
        </blockquote>
        <figure className="mt-4 text-right">
          <figcaption className="font-semibold">Ahmed M.</figcaption>
          <p className="text-sm text-muted-foreground">University Student</p>
        </figure>
      </CardContent>
    </Card>

  </div>
</section>
    </>
  );
}
