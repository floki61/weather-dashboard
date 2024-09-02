import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-background border-t">
      <div className="px-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
          © {new Date().getFullYear()} Weather Dashboard.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/floki61/weather-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
            aria-label="GitHub repository"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>GitHub</span>
          </a>
          <span className="text-sm text-muted-foreground">
            Built with <span className="text-primary"></span>{' '}
            <a
              href="https://omar-elberhichi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
              aria-label="Visit the developer's portfolio"
            >
              floki
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
