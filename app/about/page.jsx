import React from 'react'

const about = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className = "head_text text-center">
        The Future of Grading
        <br className = "max-md:hidden" /> 
      </h1>
      <p className = "desc text-center">
            In our first step in revolutionizing modern education, NivelMate serves as a powerful tool that seamlessly integrates with the essay grading process. 
      </p>
      <br />
      <p className = "desc text-center">
            By instantly providing quantitative feedback for any essay, both students and instructors can receive an insightful value that may indicate one's academic performance on a specific topic.
      </p>
      <br />
      <p className = "desc text-center">
            With the focus on enhancing human-to-human connections in the pursuit of learning, we are proud to present an innovative approach in edtech to take education to new heights.
      </p>
      <br />
      <p className = "desc text-center" style = {{color: 'green'}}>
          Made with ❤️ at Purdue University
      </p>
    </section>
  )
}

export default about