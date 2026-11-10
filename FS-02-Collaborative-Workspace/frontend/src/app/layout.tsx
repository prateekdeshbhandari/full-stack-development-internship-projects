import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gather - Work better, together",
  description:
    "A calm, collaborative workspace for your team's documents, ideas, and conversations.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <style>{`
          :root {
            color-scheme: light;
            font-family:
              Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
              "Segoe UI", sans-serif;
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: #f8f8f6;
            color: #20231f;
          }

          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            min-width: 320px;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          button,
          a {
            -webkit-tap-highlight-color: transparent;
          }

          .site-shell {
            overflow: hidden;
          }

          .topbar {
            align-items: center;
            display: flex;
            height: 78px;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 1180px;
            padding: 0 28px;
          }

          .brand {
            align-items: center;
            display: inline-flex;
            font-size: 21px;
            font-weight: 750;
            gap: 10px;
            letter-spacing: -0.8px;
          }

          .brand-mark {
            align-items: center;
            background: #d9f36a;
            border-radius: 11px;
            color: #24291c;
            display: inline-flex;
            height: 34px;
            justify-content: center;
            width: 34px;
          }

          .brand-mark svg {
            height: 20px;
            width: 20px;
          }

          .nav-links {
            align-items: center;
            color: #686b65;
            display: flex;
            font-size: 13px;
            font-weight: 550;
            gap: 34px;
          }

          .nav-links a:hover,
          .text-link:hover {
            color: #24291c;
          }

          .nav-cta,
          .button-primary {
            align-items: center;
            background: #24291f;
            border: 1px solid #24291f;
            border-radius: 999px;
            color: white;
            display: inline-flex;
            font-size: 13px;
            font-weight: 650;
            justify-content: center;
            padding: 12px 19px;
            transition:
              background 160ms ease,
              transform 160ms ease;
          }

          .nav-cta:hover,
          .button-primary:hover {
            background: #3c4531;
            transform: translateY(-1px);
          }

          .hero {
            align-items: center;
            display: grid;
            gap: 44px;
            grid-template-columns: 0.9fr 1.1fr;
            margin: 0 auto;
            max-width: 1180px;
            min-height: 635px;
            padding: 66px 28px 90px;
          }

          .eyebrow {
            align-items: center;
            color: #686b65;
            display: inline-flex;
            font-size: 11px;
            font-weight: 700;
            gap: 9px;
            letter-spacing: 1.25px;
            text-transform: uppercase;
          }

          .eyebrow-dot {
            background: #91b62c;
            border-radius: 50%;
            height: 7px;
            width: 7px;
          }

          .hero h1 {
            font-size: clamp(48px, 6vw, 76px);
            font-weight: 600;
            letter-spacing: -5.2px;
            line-height: 0.99;
            margin: 23px 0 22px;
            max-width: 540px;
          }

          .hero h1 span {
            color: #8da73f;
          }

          .hero-copy {
            color: #686b65;
            font-size: 16px;
            line-height: 1.75;
            margin: 0;
            max-width: 430px;
          }

          .hero-actions {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            gap: 22px;
            margin-top: 31px;
          }

          .button-primary {
            font-size: 14px;
            padding: 15px 22px;
          }

          .text-link {
            color: #444840;
            font-size: 13px;
            font-weight: 650;
          }

          .text-link span {
            margin-left: 5px;
          }

          .hero-note {
            color: #92958d;
            font-size: 11px;
            margin-top: 22px;
          }

          .preview-wrap {
            min-width: 0;
            position: relative;
          }

          .preview-glow {
            background: #e8efce;
            border-radius: 50%;
            filter: blur(1px);
            height: 370px;
            position: absolute;
            right: 3%;
            top: 8%;
            width: 370px;
          }

          .workspace-preview {
            background: rgba(255, 255, 255, 0.93);
            border: 1px solid #e8e9e3;
            border-radius: 16px;
            box-shadow:
              0 35px 75px rgba(48, 54, 35, 0.12),
              0 3px 9px rgba(48, 54, 35, 0.04);
            margin-left: auto;
            max-width: 510px;
            overflow: hidden;
            position: relative;
            transform: rotate(1.3deg);
            width: 100%;
          }

          .preview-top {
            align-items: center;
            border-bottom: 1px solid #eeefeb;
            display: flex;
            justify-content: space-between;
            padding: 17px 19px;
          }

          .preview-workspace {
            align-items: center;
            color: #4a4e45;
            display: flex;
            font-size: 11px;
            font-weight: 650;
            gap: 9px;
          }

          .workspace-icon {
            align-items: center;
            background: #e8efd5;
            border-radius: 7px;
            color: #697e34;
            display: inline-flex;
            font-size: 12px;
            height: 25px;
            justify-content: center;
            width: 25px;
          }

          .window-dots {
            color: #c9cbc4;
            font-size: 15px;
            letter-spacing: 2px;
          }

          .preview-body {
            display: grid;
            grid-template-columns: 126px 1fr;
            min-height: 330px;
          }

          .preview-sidebar {
            background: #fbfbf9;
            border-right: 1px solid #eeefeb;
            padding: 19px 12px;
          }

          .sidebar-label {
            color: #a0a298;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.9px;
            margin: 0 0 12px 7px;
            text-transform: uppercase;
          }

          .sidebar-item {
            border-radius: 6px;
            color: #777a72;
            font-size: 9px;
            margin: 3px 0;
            padding: 8px 7px;
          }

          .sidebar-item.active {
            background: #eef2e3;
            color: #52652c;
            font-weight: 650;
          }

          .doc-content {
            padding: 26px 26px 22px;
          }

          .doc-meta {
            color: #9a9c94;
            font-size: 8px;
            letter-spacing: 0.5px;
          }

          .doc-content h2 {
            color: #282b25;
            font-size: 21px;
            letter-spacing: -0.8px;
            margin: 15px 0 8px;
          }

          .doc-subtitle {
            color: #85877f;
            font-size: 9px;
            margin: 0 0 24px;
          }

          .doc-heading {
            color: #393c35;
            font-size: 10px;
            font-weight: 700;
            margin: 0 0 9px;
          }

          .doc-line {
            background: #e9eae5;
            border-radius: 5px;
            height: 5px;
            margin: 7px 0;
            width: 100%;
          }

          .doc-line.medium {
            width: 83%;
          }

          .doc-line.short {
            width: 61%;
          }

          .doc-highlight {
            background: #f5f7ed;
            border-left: 2px solid #b5ce69;
            border-radius: 0 5px 5px 0;
            color: #656a58;
            font-size: 8px;
            line-height: 1.55;
            margin: 16px 0;
            padding: 10px 11px;
          }

          .collaborator-card {
            align-items: center;
            background: white;
            border: 1px solid #ecece7;
            border-radius: 11px;
            box-shadow: 0 9px 24px rgba(44, 49, 33, 0.09);
            display: flex;
            gap: 10px;
            padding: 11px 13px;
            position: absolute;
          }

          .collaborator-card.one {
            right: -9px;
            top: 16%;
          }

          .collaborator-card.two {
            bottom: 10%;
            left: -20px;
          }

          .avatar {
            align-items: center;
            border: 2px solid white;
            border-radius: 50%;
            color: white;
            display: inline-flex;
            flex: 0 0 auto;
            font-size: 8px;
            font-weight: 700;
            height: 25px;
            justify-content: center;
            width: 25px;
          }

          .avatar.lilac {
            background: #a393bd;
          }

          .avatar.coral {
            background: #d78c70;
          }

          .avatar.sage {
            background: #78956e;
          }

          .collaborator-name {
            color: #34372f;
            font-size: 9px;
            font-weight: 700;
          }

          .collaborator-action {
            color: #9a9c94;
            font-size: 8px;
            margin-top: 3px;
          }

          .live-dot {
            background: #73ad4e;
            border: 2px solid white;
            border-radius: 50%;
            bottom: -1px;
            height: 9px;
            position: absolute;
            right: -1px;
            width: 9px;
          }

          .avatar-wrap {
            position: relative;
          }

          .section {
            margin: 0 auto;
            max-width: 1180px;
            padding: 30px 28px 96px;
          }

          .section-heading {
            align-items: end;
            display: flex;
            justify-content: space-between;
            margin-bottom: 29px;
          }

          .section-heading h2 {
            font-size: 30px;
            font-weight: 600;
            letter-spacing: -1.5px;
            margin: 11px 0 0;
          }

          .section-heading p {
            color: #777a72;
            font-size: 12px;
            line-height: 1.7;
            margin: 0;
            max-width: 290px;
          }

          .feature-grid {
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(3, 1fr);
          }

          .feature-card {
            background: #fff;
            border: 1px solid #edeee9;
            border-radius: 13px;
            min-height: 170px;
            padding: 22px;
          }

          .feature-icon {
            align-items: center;
            background: #f0f3e7;
            border-radius: 9px;
            color: #667e31;
            display: flex;
            font-size: 17px;
            height: 36px;
            justify-content: center;
            width: 36px;
          }

          .feature-card h3 {
            font-size: 13px;
            margin: 17px 0 7px;
          }

          .feature-card p {
            color: #7d8077;
            font-size: 11px;
            line-height: 1.7;
            margin: 0;
            max-width: 290px;
          }

          .footer {
            align-items: center;
            border-top: 1px solid #e9eae5;
            color: #868981;
            display: flex;
            font-size: 10px;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 1180px;
            padding: 22px 28px 30px;
          }

          @media (max-width: 820px) {
            .hero {
              gap: 30px;
              grid-template-columns: 1fr;
              padding-bottom: 55px;
              padding-top: 52px;
            }

            .hero-copy {
              max-width: 540px;
            }

            .preview-wrap {
              margin: 10px auto 0;
              max-width: 560px;
              width: 100%;
            }

            .section {
              padding-bottom: 65px;
            }
          }

          @media (max-width: 560px) {
            .topbar {
              height: 68px;
              padding: 0 20px;
            }

            .nav-links {
              gap: 0;
            }

            .nav-links > a:not(.nav-cta) {
              display: none;
            }

            .nav-cta {
              font-size: 11px;
              padding: 10px 14px;
            }

            .hero {
              padding: 44px 20px 48px;
            }

            .hero h1 {
              font-size: 55px;
              letter-spacing: -3.7px;
            }

            .hero-copy {
              font-size: 14px;
            }

            .preview-body {
              grid-template-columns: 92px 1fr;
              min-height: 290px;
            }

            .preview-sidebar {
              padding: 17px 7px;
            }

            .doc-content {
              padding: 23px 15px 18px;
            }

            .collaborator-card.one {
              right: -4px;
            }

            .collaborator-card.two {
              left: -6px;
            }

            .section {
              padding: 25px 20px 52px;
            }

            .section-heading {
              align-items: start;
              flex-direction: column;
              gap: 12px;
            }

            .section-heading h2 {
              font-size: 27px;
            }

            .feature-grid {
              grid-template-columns: 1fr;
            }

            .feature-card {
              min-height: 0;
            }

            .footer {
              align-items: start;
              flex-direction: column;
              gap: 8px;
              padding: 20px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}