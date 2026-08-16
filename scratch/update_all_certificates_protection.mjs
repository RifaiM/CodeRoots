import fs from 'fs';

const certConfigs = [
    {
        file: 'src/pages/2. partB/certificate.astro',
        track: 'partB',
        levelTag: 'Level 4',
        totalProjects: 15,
        hubUrl: '/2. partB/hub.html',
        certName: 'Level 4: JS DOM Widget Dojo'
    },
    {
        file: 'src/pages/3. partC/certificate.astro',
        track: 'partC',
        levelTag: 'Level 5',
        totalProjects: 15,
        hubUrl: '/3. partC/hub.html',
        certName: 'Level 5: React Component Dojo'
    },
    {
        file: 'src/pages/5. partE/certificate.astro',
        track: 'partE',
        levelTag: 'Level 6',
        totalProjects: 15,
        hubUrl: '/5. partE/hub.html',
        certName: 'Level 6: Python Backend Dojo'
    },
    {
        file: 'src/pages/6. partF/certificate.astro',
        track: 'partF',
        levelTag: 'Level 7',
        totalProjects: 18,
        hubUrl: '/6. partF/hub.html',
        certName: 'Level 7: Specialized Developer Tracks'
    },
    {
        file: 'src/pages/7. partG/certificate.astro',
        track: 'partG',
        levelTag: 'Level 8',
        totalProjects: 6,
        hubUrl: '/7. partG/hub.html',
        certName: 'Level 8: Async UI & Skeletons'
    },
    {
        file: 'src/pages/8. partH/certificate.astro',
        track: 'partH',
        levelTag: 'Level 9',
        totalProjects: 6,
        hubUrl: '/8. partH/hub.html',
        certName: 'Level 9: User Logins & Auth'
    },
    {
        file: 'src/pages/9. partI/certificate.astro',
        track: 'partI',
        levelTag: 'Level 10',
        totalProjects: 6,
        hubUrl: '/9. partI/hub.html',
        certName: 'Level 10: Complete SaaS Capstone'
    }
];

certConfigs.forEach(cfg => {
    let content = fs.readFileSync(cfg.file, 'utf-8');

    // Replace the script section in certificate.astro
    const scriptIndex = content.lastIndexOf('<script>');
    if (scriptIndex !== -1) {
        const topPart = content.substring(0, scriptIndex);
        const newScript = `<script>
        import { checkCertificateAccessAndRenderOverlay } from '../../scripts/dojo/core/protection';

        // 1. Watertight Certificate Security Verification (Immediate Overlay Guard)
        const isAccessible = checkCertificateAccessAndRenderOverlay({
            track: '${cfg.track}',
            levelTag: '${cfg.levelTag}',
            totalProjects: ${cfg.totalProjects},
            hubUrl: '${cfg.hubUrl}',
            certName: '${cfg.certName}'
        });

        if (isAccessible) {
            document.addEventListener('DOMContentLoaded', () => {
                const nameInput = document.getElementById('learnerNameInput') as HTMLInputElement | null;
                const certName = document.getElementById('certRecipientName');
                const genBtn = document.getElementById('generateCertBtn');
                const dlBtn = document.getElementById('downloadCertBtn');
                const dateSpan = document.getElementById('certIssueDate');

                if (dateSpan) {
                    dateSpan.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }

                function updateName() {
                    if (certName && nameInput) {
                        certName.textContent = nameInput.value.trim() || 'Software Engineer';
                    }
                }

                if (nameInput) nameInput.addEventListener('input', updateName);
                if (genBtn) genBtn.addEventListener('click', updateName);

                // High-Res PNG Download
                if (dlBtn) {
                    dlBtn.addEventListener('click', () => {
                        const certFrame = document.getElementById('certificateFrame');
                        if (!certFrame || typeof (window as any).html2canvas === 'undefined') return;

                        (window as any).html2canvas(certFrame, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
                            const link = document.createElement('a');
                            link.download = \`NoviCodes_${cfg.levelTag.replace(/\\s+/g, '_')}_Certificate_\${(nameInput?.value || 'Learner').replace(/\\s+/g, '_')}.png\`;
                            link.href = canvas.toDataURL('image/png');
                            link.click();
                        });
                    });
                }
            });
        }
    </script>
</BaseLayout>
`;
        fs.writeFileSync(cfg.file, topPart + newScript, 'utf-8');
        console.log(`✅ Updated certificate security guard in ${cfg.file}`);
    }
});
