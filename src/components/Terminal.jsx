import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  { text: 'arpit@portfolio ~ % whoami', isCommand: true },
  { text: 'Full-stack developer | DSA in Java | Building real products', isCommand: false },
  { text: 'Type "help" to see available commands.', isCommand: false },
];

const TYPING_SPEED = 40; // ms per character
const LINE_DELAY = 400; // ms pause between lines

const COMMANDS = {
  help: () => 'Available commands: help, projects, skills, experience, resume, education, contact, clear',
  projects: () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to projects...';
  },
  skills: () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    return 'Loading skills...';
  },
  experience: () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to experience...';
  },
  resume: () => 'Downloading resume... (just kidding, scroll up!)',
  education: () => {
    document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to education...';
  },
  contact: () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    return 'Navigating to contact...';
  },
};

const PROMPT = 'guest@arpit:~$ ';

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [bootDone, setBootDone] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const bootIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  // ─── Auto-scroll to bottom ───
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentTyping, history, inputValue]);

  // ─── Typewriter boot sequence ───
  useEffect(() => {
    if (bootDone) return;

    const lineIdx = bootIndexRef.current;
    if (lineIdx >= BOOT_LINES.length) {
      setBootDone(true);
      return;
    }

    const line = BOOT_LINES[lineIdx];
    const fullText = line.text;

    const typeChar = () => {
      if (charIndexRef.current <= fullText.length) {
        setCurrentTyping(fullText.slice(0, charIndexRef.current));
        charIndexRef.current += 1;
      } else {
        // Line finished — commit it
        setDisplayedLines((prev) => [
          ...prev,
          { text: fullText, isCommand: line.isCommand },
        ]);
        setCurrentTyping('');
        charIndexRef.current = 0;
        bootIndexRef.current += 1;

        // Schedule next line after delay
        setTimeout(() => {
          // trigger re-run by bumping state
          setDisplayedLines((prev) => [...prev]); // force re-render to restart effect
        }, LINE_DELAY);
        return;
      }
    };

    const timer = setInterval(typeChar, TYPING_SPEED);
    return () => clearInterval(timer);
  }, [displayedLines, bootDone]);

  // ─── Keep hidden input focused ───
  const focusInput = useCallback(() => {
    if (bootDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootDone]);

  useEffect(() => {
    focusInput();
  }, [bootDone, focusInput]);

  // ─── Handle command execution ───
  const executeCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase();

      // Always push the command line to history
      const newHistory = [
        ...history,
        { type: 'command', text: `${PROMPT}${cmd}` },
      ];

      if (trimmed === 'clear') {
        setHistory([]);
        setDisplayedLines([]);
        setInputValue('');
        setCmdHistory((prev) => [...prev, trimmed]);
        setCmdHistoryIdx(-1);
        return;
      }

      const handler = COMMANDS[trimmed];
      const response = handler
        ? handler()
        : 'Command not found. Type "help" for available commands.';

      newHistory.push({ type: 'response', text: response });
      setHistory(newHistory);
      setInputValue('');
      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdHistoryIdx(-1);
    },
    [history]
  );

  // ─── Handle key events ───
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdHistoryIdx((prev) => {
        const newIdx = prev === -1 ? cmdHistory.length - 1 : Math.max(0, prev - 1);
        if (cmdHistory[newIdx] !== undefined) {
          setInputValue(cmdHistory[newIdx]);
        }
        return newIdx;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCmdHistoryIdx((prev) => {
        const newIdx = prev + 1;
        if (newIdx >= cmdHistory.length) {
          setInputValue('');
          return -1;
        }
        setInputValue(cmdHistory[newIdx]);
        return newIdx;
      });
    }
  };

  // ─── Render a single boot line ───
  const renderBootLine = (line, idx) => (
    <div key={`boot-${idx}`} className="leading-relaxed">
      {line.isCommand ? (
        <span className="text-green-400">{line.text}</span>
      ) : (
        <span className="text-gray-300">{line.text}</span>
      )}
    </div>
  );

  // ─── Render history entries ───
  const renderHistoryEntry = (entry, idx) => (
    <div key={`hist-${idx}`} className="leading-relaxed">
      {entry.type === 'command' ? (
        <span className="text-green-400">{entry.text}</span>
      ) : (
        <span className="text-gray-300">{entry.text}</span>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      className="w-full"
    >
      <div
        className="brutal-card rounded-[14px] overflow-hidden bg-brutal-navy"
        onClick={focusInput}
      >
        {/* ─── Title Bar ─── */}
        <div className="flex items-center px-4 py-3 bg-[#16162a] border-b-[3px] border-brutal-black">
          {/* macOS dots */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: '#FF6B6B' }}
            />
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: '#FFE156' }}
            />
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: '#2ECC71' }}
            />
          </div>

          {/* Centered title */}
          <span className="flex-1 text-center text-gray-400 text-xs font-mono tracking-wider select-none">
            arpit@portfolio ~ %
          </span>

          {/* Spacer to keep title centered */}
          <div className="w-[52px]" />
        </div>

        {/* ─── Terminal Body ─── */}
        <div
          ref={terminalRef}
          className="h-[300px] overflow-y-auto p-4 font-mono text-sm space-y-1 cursor-text"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Boot lines already typed */}
          {displayedLines.map(renderBootLine)}

          {/* Currently typing line */}
          {!bootDone && currentTyping !== '' && (
            <div className="leading-relaxed">
              <span className="text-green-400">
                {currentTyping}
                <span className="cursor-blink text-green-400">▋</span>
              </span>
            </div>
          )}

          {/* Interactive history */}
          {bootDone && history.map(renderHistoryEntry)}

          {/* Active prompt */}
          {bootDone && (
            <div className="flex items-center leading-relaxed">
              <span className="text-green-400 whitespace-pre">{PROMPT}</span>
              <span className="text-green-400">{inputValue}</span>
              <span className="cursor-blink text-green-400 ml-[1px]">▋</span>
            </div>
          )}
        </div>

        {/* Hidden input to capture keystrokes */}
        {bootDone && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={focusInput}
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        )}
      </div>
    </motion.div>
  );
}
