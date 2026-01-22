import { useState, useEffect } from "react";

const QUOTES_URL =
  "https://raw.githubusercontent.com/Janxyxy/quotes-database/main/quotes.json";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(QUOTES_URL)
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Nepodařilo se načíst citáty");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentQuote) {
      setDisplayedText("");
      const text = currentQuote.quote;
      const duration = 1200;
      const charDelay = duration / text.length;

      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, charDelay);

      return () => clearInterval(interval);
    }
  }, [currentQuote]);

  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white/60 text-lg">Načítám...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white/60 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 relative">
      <h1 className="text-white/40 text-2xl md:text-4xl font-serif tracking-wide mb-12">
        Random Quote
      </h1>

      <div className="max-w-xl w-full text-center min-h-[400px] flex flex-col justify-center">
        {currentQuote && (
          <>
            <p className="text-2xl md:text-3xl text-white font-serif font-light leading-relaxed mb-8 italic">
              "{displayedText}"
            </p>
            <p
              className={`text-white/50 text-base font-sans transition-opacity duration-300 ${displayedText === currentQuote.quote ? "opacity-100" : "opacity-0"}`}
            >
              {currentQuote.author}
            </p>
          </>
        )}
      </div>

      <button
        onClick={getRandomQuote}
        className="px-6 py-3 bg-white/10 text-white/80 text-sm rounded-lg hover:bg-white/20 transition-colors duration-200 cursor-pointer"
      >
        New Quote
      </button>

      <a
        href="https://github.com/Janxyxy/quotes-database"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 text-white/30 text-xs hover:text-white/50 transition-colors"
      >
        Data from: github.com/Janxyxy/quotes-database
      </a>
    </div>
  );
}

export default App;
