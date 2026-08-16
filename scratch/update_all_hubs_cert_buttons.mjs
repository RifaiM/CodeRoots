import fs from 'fs';

// 1. Update public/2. partB/hub.js
let partB = fs.readFileSync('public/2. partB/hub.js', 'utf-8');
const oldPartBCert = `            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 DOM Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = \`Finish all 15 real-world JavaScript projects to unlock your official DOM Architect certificate (\${completedCount}/15 completed).\`;
            }`;

const newPartBCert = `            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 DOM Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = (e) => {
                    e.preventDefault();
                    if (typeof window.showCertLockWarning === 'function') {
                        window.showCertLockWarning('Level 4', completedCount, total);
                    } else if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Level 4 Certificate Locked 📜',
                            text: \`You have completed \${completedCount} of \${total} projects. Finish all 15 to claim your official certificate!\`,
                            confirmButtonColor: '#2563eb'
                        });
                    }
                };
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = \`Finish all 15 real-world JavaScript projects to unlock your official DOM Architect certificate (\${completedCount}/15 completed).\`;
            }`;
partB = partB.replace(oldPartBCert, newPartBCert);
fs.writeFileSync('public/2. partB/hub.js', partB, 'utf-8');
console.log('✅ Updated public/2. partB/hub.js cert button handler');


// 2. Update public/3. partC/hub.js
let partC = fs.readFileSync('public/3. partC/hub.js', 'utf-8');
const oldPartCCert = `            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 React Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = \`Finish all 15 modern React framework projects to unlock your official React Specialist certificate (\${completedCount}/15 completed).\`;
            }`;

const newPartCCert = `            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 React Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = (e) => {
                    e.preventDefault();
                    if (typeof window.showCertLockWarning === 'function') {
                        window.showCertLockWarning('Level 5', completedCount, total);
                    } else if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Level 5 Certificate Locked 📜',
                            text: \`You have completed \${completedCount} of \${total} projects. Finish all 15 to claim your official certificate!\`,
                            confirmButtonColor: '#2563eb'
                        });
                    }
                };
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = \`Finish all 15 modern React framework projects to unlock your official React Specialist certificate (\${completedCount}/15 completed).\`;
            }`;
partC = partC.replace(oldPartCCert, newPartCCert);
fs.writeFileSync('public/3. partC/hub.js', partC, 'utf-8');
console.log('✅ Updated public/3. partC/hub.js cert button handler');


// 3. Update public/5. partE/hub.js
let partE = fs.readFileSync('public/5. partE/hub.js', 'utf-8');
partE = partE.replace(oldPartCCert.replace(/React/g, 'Python'), `            if (completedCount === total || isLessonCompleted(15)) {
                certBtn.className = 'cert-action-btn unlocked';
                certBtn.href = './certificate.html';
                certBtn.onclick = null;
                certBtn.innerHTML = '<span>🏆 Claim Certificate ➔</span>';
                certDesc.textContent = 'Congratulations! You completed all 15 Python Dojo projects. Download your official certificate.';
            } else {
                certBtn.className = 'cert-action-btn locked';
                certBtn.href = 'javascript:void(0)';
                certBtn.onclick = (e) => {
                    e.preventDefault();
                    if (typeof window.showCertLockWarning === 'function') {
                        window.showCertLockWarning('Level 6', completedCount, total);
                    } else if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Level 6 Certificate Locked 📜',
                            text: \`You have completed \${completedCount} of \${total} projects. Finish all 15 to claim your official certificate!\`,
                            confirmButtonColor: '#2563eb'
                        });
                    }
                };
                certBtn.innerHTML = '<span>🔒 Complete All 15 First</span>';
                certDesc.textContent = \`Finish all 15 Python backend projects to unlock your official Python Specialist certificate (\${completedCount}/15 completed).\`;
            }`);
fs.writeFileSync('public/5. partE/hub.js', partE, 'utf-8');
console.log('✅ Updated public/5. partE/hub.js cert button handler');


// 4. Update src/pages/7. partG/hub.astro
let partG = fs.readFileSync('src/pages/7. partG/hub.astro', 'utf-8');
partG = partG.replace(
    '<a href="/7. partG/certificate.html" class="cert-cta-btn locked" id="certButton">',
    '<a href="javascript:void(0)" class="cert-cta-btn locked" id="certButton">'
);
const oldPartGCertScript = `            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.innerHTML = '<span>🎓 View & Download Certificate ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }`;

const newPartGCertScript = `            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.href = '/7. partG/certificate.html';
                    certBtn.onclick = null;
                    certBtn.innerHTML = '<span>🎓 View & Download Certificate ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.href = 'javascript:void(0)';
                    certBtn.onclick = (e) => {
                        e.preventDefault();
                        if (typeof (window as any).showCertLockWarning === 'function') {
                            (window as any).showCertLockWarning('Level 8', completedCount, LESSON_KEYS.length);
                        } else if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Level 8 Certificate Locked 📜',
                                text: \`You have completed \${completedCount} of \${LESSON_KEYS.length} projects. Finish all 6 to claim your certificate!\`,
                                confirmButtonColor: '#2563eb'
                            });
                        }
                    };
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }`;
partG = partG.replace(oldPartGCertScript, newPartGCertScript);
fs.writeFileSync('src/pages/7. partG/hub.astro', partG, 'utf-8');
console.log('✅ Updated src/pages/7. partG/hub.astro cert button handler');


// 5. Update src/pages/8. partH/hub.astro
let partH = fs.readFileSync('src/pages/8. partH/hub.astro', 'utf-8');
partH = partH.replace(
    '<a href="/8. partH/certificate.html" class="cert-cta-btn locked" id="certButton">',
    '<a href="javascript:void(0)" class="cert-cta-btn locked" id="certButton">'
);
const newPartHCertScript = `            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.href = '/8. partH/certificate.html';
                    certBtn.onclick = null;
                    certBtn.innerHTML = '<span>🎓 View & Download Certificate ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.href = 'javascript:void(0)';
                    certBtn.onclick = (e) => {
                        e.preventDefault();
                        if (typeof (window as any).showCertLockWarning === 'function') {
                            (window as any).showCertLockWarning('Level 9', completedCount, LESSON_KEYS.length);
                        } else if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Level 9 Certificate Locked 📜',
                                text: \`You have completed \${completedCount} of \${LESSON_KEYS.length} projects. Finish all 6 to claim your certificate!\`,
                                confirmButtonColor: '#2563eb'
                            });
                        }
                    };
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }`;
partH = partH.replace(oldPartGCertScript, newPartHCertScript);
fs.writeFileSync('src/pages/8. partH/hub.astro', partH, 'utf-8');
console.log('✅ Updated src/pages/8. partH/hub.astro cert button handler');


// 6. Update src/pages/9. partI/hub.astro
let partI = fs.readFileSync('src/pages/9. partI/hub.astro', 'utf-8');
partI = partI.replace(
    '<a href="/9. partI/certificate.html" class="cert-cta-btn locked" id="certButton">',
    '<a href="javascript:void(0)" class="cert-cta-btn locked" id="certButton">'
);
const oldPartICertScript = `            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.innerHTML = '<span>🎓 View & Download Diploma ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }`;

const newPartICertScript = `            const certBtn = document.getElementById('certButton');
            if (certBtn) {
                if (completedCount === LESSON_KEYS.length) {
                    certBtn.className = 'cert-cta-btn unlocked';
                    certBtn.href = '/9. partI/certificate.html';
                    certBtn.onclick = null;
                    certBtn.innerHTML = '<span>🎓 View & Download Diploma ➔</span>';
                } else {
                    certBtn.className = 'cert-cta-btn locked';
                    certBtn.href = 'javascript:void(0)';
                    certBtn.onclick = (e) => {
                        e.preventDefault();
                        if (typeof (window as any).showCertLockWarning === 'function') {
                            (window as any).showCertLockWarning('Level 10', completedCount, LESSON_KEYS.length);
                        } else if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Level 10 Diploma Locked 📜',
                                text: \`You have completed \${completedCount} of \${LESSON_KEYS.length} milestones. Finish all 6 to claim your diploma!\`,
                                confirmButtonColor: '#2563eb'
                            });
                        }
                    };
                    certBtn.innerHTML = \`<span>🔒 Complete \${LESSON_KEYS.length - completedCount} More to Unlock</span>\`;
                }
            }`;
partI = partI.replace(oldPartICertScript, newPartICertScript);
fs.writeFileSync('src/pages/9. partI/hub.astro', partI, 'utf-8');
console.log('✅ Updated src/pages/9. partI/hub.astro cert button handler');
