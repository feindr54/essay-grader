import Link from 'next/link';

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
        <h1 className = "head_text text-center">
            AI-Powered Essay Grading,
            <br className = "max-md:hidden" />
            <span className = "head_text green_gradient text-center"> Human-Centric Learning</span>
        </h1>
        <p className = "desc text-center">
            NivelMate is an AI-powered educational tool that grades students' essays in an instant, saving hours of time and supporting an unbiased evaluation system.
        </p>
        <br className = "max-md:hidden" />
        <div><br /></div>
        <div className = "flex gap-3 md:gap-5">
                <Link href = "/program" className = "black_btn">
                    Let's Go
                </Link>
            </div>
    </section>
  )
}

export default Home