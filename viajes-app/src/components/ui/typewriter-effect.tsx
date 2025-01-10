"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Función de utilidad cn
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>(words.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= words.length) {
      setIsComplete(true);
      return;
    }

    const word = words[currentLine].text;
    if (currentChar < word.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => {
          const newText = [...prev];
          newText[currentLine] = word.substring(0, currentChar + 1);
          return newText;
        });
        setCurrentChar(prev => prev + 1);
      }, 70); // Velocidad aumentada: cambié de 100ms a 70ms

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (currentLine < words.length - 1) {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      }, 400); // Pausa entre líneas reducida: cambié de 500ms a 400ms

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, words]);

  const renderWords = () => {
    return (
      <div className="flex flex-col gap-2">
        {words.map((word, idx) => (
          <div key={`word-${idx}`} className="relative inline-block">
            <span className={cn(`inline-block`, word.className)}>
              {displayedText[idx]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex items-start my-6 relative", className)} ref={containerRef}>
      <div className="overflow-hidden">
        <div className="text-left">
          {renderWords()}
        </div>
      </div>
      {!isComplete && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "absolute block rounded-sm w-[4px]",
            cursorClassName
          )}
          style={{
            top: `${currentLine * 50}px`,
            left: `${displayedText[currentLine].length * 30}px`,
            height: '42px',
            transform: 'translateY(20px)', 
            display: 'block'
          }}
        />
      )}
    </div>
  );
};