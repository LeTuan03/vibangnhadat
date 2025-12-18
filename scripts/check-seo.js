/**
 * SEO Optimization Script
 * This script helps with various SEO tasks for the website
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if required SEO files exist
function checkSEOFiles() {
    log('\n📋 Checking SEO Files...', 'bright');

    const files = [
        { path: 'public/robots.txt', name: 'robots.txt' },
        { path: 'public/sitemap.xml', name: 'sitemap.xml' },
        { path: 'public/og-image.jpg', name: 'og-image.jpg (Social Media Image)' },
        { path: 'index.html', name: 'index.html' }
    ];

    let allExist = true;

    files.forEach(file => {
        const exists = fs.existsSync(file.path);
        if (exists) {
            log(`  ✅ ${file.name}`, 'green');
        } else {
            log(`  ❌ ${file.name} - MISSING!`, 'red');
            allExist = false;
        }
    });

    return allExist;
}

// Validate robots.txt
function validateRobotsTxt() {
    log('\n🤖 Validating robots.txt...', 'bright');

    try {
        const robotsPath = 'public/robots.txt';
        if (!fs.existsSync(robotsPath)) {
            log('  ❌ robots.txt not found!', 'red');
            return false;
        }

        const content = fs.readFileSync(robotsPath, 'utf8');

        const checks = [
            { test: content.includes('User-agent:'), message: 'User-agent directive' },
            { test: content.includes('Sitemap:'), message: 'Sitemap URL' },
            { test: content.includes('thuaphatlaihoangmai.com'), message: 'Correct domain' }
        ];

        let valid = true;
        checks.forEach(check => {
            if (check.test) {
                log(`  ✅ ${check.message}`, 'green');
            } else {
                log(`  ❌ ${check.message} - MISSING!`, 'red');
                valid = false;
            }
        });

        return valid;
    } catch (error) {
        log(`  ❌ Error: ${error.message}`, 'red');
        return false;
    }
}

// Validate sitemap.xml
function validateSitemap() {
    log('\n🗺️  Validating sitemap.xml...', 'bright');

    try {
        const sitemapPath = 'public/sitemap.xml';
        if (!fs.existsSync(sitemapPath)) {
            log('  ❌ sitemap.xml not found!', 'red');
            return false;
        }

        const content = fs.readFileSync(sitemapPath, 'utf8');

        const checks = [
            { test: content.includes('<?xml'), message: 'Valid XML format' },
            { test: content.includes('<urlset'), message: 'URLset tag' },
            { test: content.includes('thuaphatlaihoangmai.com'), message: 'Correct domain' },
            { test: content.includes('<loc>'), message: 'Location tags' },
            { test: content.includes('<lastmod>'), message: 'Last modified dates' }
        ];

        let valid = true;
        checks.forEach(check => {
            if (check.test) {
                log(`  ✅ ${check.message}`, 'green');
            } else {
                log(`  ⚠️  ${check.message} - MISSING!`, 'yellow');
                valid = false;
            }
        });

        // Count URLs
        const urlCount = (content.match(/<url>/g) || []).length;
        log(`  📊 Total URLs: ${urlCount}`, 'blue');

        return valid;
    } catch (error) {
        log(`  ❌ Error: ${error.message}`, 'red');
        return false;
    }
}

// Check meta tags in index.html
function checkMetaTags() {
    log('\n🏷️  Checking Meta Tags in index.html...', 'bright');

    try {
        const indexPath = 'index.html';
        if (!fs.existsSync(indexPath)) {
            log('  ❌ index.html not found!', 'red');
            return false;
        }

        const content = fs.readFileSync(indexPath, 'utf8');

        const checks = [
            { test: content.includes('meta name="description"'), message: 'Meta description' },
            { test: content.includes('meta name="keywords"'), message: 'Meta keywords' },
            { test: content.includes('meta name="robots"'), message: 'Robots meta tag' },
            { test: content.includes('og:title'), message: 'Open Graph title' },
            { test: content.includes('og:description'), message: 'Open Graph description' },
            { test: content.includes('og:image'), message: 'Open Graph image' },
            { test: content.includes('twitter:card'), message: 'Twitter Card' },
            { test: content.includes('google-site-verification'), message: 'Google Site Verification' },
            { test: content.includes('application/ld+json'), message: 'Structured Data (JSON-LD)' },
            { test: content.includes('canonical'), message: 'Canonical URL' }
        ];

        let valid = true;
        checks.forEach(check => {
            if (check.test) {
                log(`  ✅ ${check.message}`, 'green');
            } else {
                log(`  ❌ ${check.message} - MISSING!`, 'red');
                valid = false;
            }
        });

        return valid;
    } catch (error) {
        log(`  ❌ Error: ${error.message}`, 'red');
        return false;
    }
}

// Generate SEO report
function generateReport() {
    log('\n' + '='.repeat(60), 'bright');
    log('📊 SEO OPTIMIZATION REPORT', 'bright');
    log('='.repeat(60), 'bright');

    const filesOk = checkSEOFiles();
    const robotsOk = validateRobotsTxt();
    const sitemapOk = validateSitemap();
    const metaOk = checkMetaTags();

    log('\n' + '='.repeat(60), 'bright');
    log('📈 SUMMARY', 'bright');
    log('='.repeat(60), 'bright');

    const results = [
        { name: 'SEO Files', status: filesOk },
        { name: 'robots.txt', status: robotsOk },
        { name: 'sitemap.xml', status: sitemapOk },
        { name: 'Meta Tags', status: metaOk }
    ];

    results.forEach(result => {
        const icon = result.status ? '✅' : '❌';
        const color = result.status ? 'green' : 'red';
        log(`  ${icon} ${result.name}`, color);
    });

    const allPassed = results.every(r => r.status);

    log('\n' + '='.repeat(60), 'bright');
    if (allPassed) {
        log('🎉 ALL CHECKS PASSED! Your site is SEO-ready!', 'green');
    } else {
        log('⚠️  SOME CHECKS FAILED. Please review the issues above.', 'yellow');
    }
    log('='.repeat(60) + '\n', 'bright');

    // Next steps
    log('📝 NEXT STEPS:', 'bright');
    log('  1. Submit sitemap to Google Search Console', 'blue');
    log('  2. Request indexing for important pages', 'blue');
    log('  3. Create og-image.jpg if missing', 'blue');
    log('  4. Monitor Google Search Console for issues', 'blue');
    log('  5. Update sitemap when adding new content\n', 'blue');
}

// Main execution
try {
    generateReport();
} catch (error) {
    log(`\n❌ Error running SEO check: ${error.message}`, 'red');
    process.exit(1);
}
