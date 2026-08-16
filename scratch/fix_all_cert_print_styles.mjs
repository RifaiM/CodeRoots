import fs from 'fs';

const certFiles = [
    'src/pages/2. partB/certificate.astro',
    'src/pages/3. partC/certificate.astro',
    'src/pages/5. partE/certificate.astro',
    'src/pages/6. partF/certificate.astro',
    'src/pages/7. partG/certificate.astro',
    'src/pages/8. partH/certificate.astro',
    'src/pages/9. partI/certificate.astro'
];

const pristinePrintBlock = `        @media (max-width: 768px) {
            .cert-headline {
                font-size: 1.5rem;
            }
            .cert-recipient-name {
                font-size: 1.4rem;
            }
            .cert-footer-row {
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }
        }

        /* ── Pixel-Perfect Print Stylesheet (Hides Navbar, Footer & Form Controls) ─── */
        @media print {
            @page {
                size: landscape;
                margin: 0;
            }
            html, body {
                background: #ffffff !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            header, footer, nav, .platform-header, .platform-footer, .generator-card, .btn-row, #printCertBtn, .whats-next-section {
                display: none !important;
            }
            .cert-page-container {
                padding: 0 !important;
                margin: 0 !important;
                max-width: 100% !important;
                min-height: auto !important;
                background: transparent !important;
                display: block !important;
            }
            .cert-container {
                max-width: 100% !important;
                gap: 0 !important;
                padding: 0 !important;
                margin: 0 !important;
                display: block !important;
            }
            .certificate-frame {
                box-shadow: none !important;
                border: 12px solid #0f172a !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                width: 94% !important;
                max-width: 980px !important;
                margin: 20px auto !important;
                box-sizing: border-box !important;
            }
            .certificate-inner {
                padding: 32px 40px !important;
            }
            .cert-headline {
                font-size: 1.8rem !important;
            }
            .cert-recipient-name {
                font-size: 2rem !important;
                margin: 12px 0 16px 0 !important;
            }
            .cert-body-text {
                font-size: 0.95rem !important;
                line-height: 1.6 !important;
                margin-bottom: 24px !important;
            }
            .cert-footer-row {
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important;
                align-items: flex-end !important;
                width: 100% !important;
                margin-top: 24px !important;
                gap: 0 !important;
            }
            .cert-sig-col {
                display: flex !important;
                flex-direction: column !important;
                width: 220px !important;
                text-align: center !important;
                align-items: center !important;
            }
            .cert-badge-center {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
            }
            .cert-gold-seal {
                width: 72px !important;
                height: 72px !important;
            }
        }`;

certFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace from @media (max-width: 768px) up to </style>
    const regex = /@media \(max-width: 768px\)[\s\S]*?<\/style>/;
    if (regex.test(content)) {
        content = content.replace(regex, `${pristinePrintBlock}\n    </style>`);
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated print styles in: ${file}`);
    } else {
        console.error(`Could not match in: ${file}`);
    }
});
