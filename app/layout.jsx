import '@styles/globals.css';

export const metadata = {
    title: "NivelMate",
    description: 'AI-Powered Essay Grading, Human-Centric Learning'
}

const RootLayout = ({ children }) => {
  return (
    <html lang = "en">
        <body>
            <div className = "main">
                <div className = "gradient" />
            </div>

        <main className = "app">
            {children}
        </main>
        </body>
    </html>
  )
}

export default RootLayout;