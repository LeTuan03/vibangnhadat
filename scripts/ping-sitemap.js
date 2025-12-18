/**
 * Ping Google and Bing about sitemap updates
 * This script notifies search engines when sitemap is updated
 */

import https from 'https';

const SITEMAP_URL = 'https://thuaphatlaihoangmai.com/sitemap.xml';

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

// Ping a URL and return promise
function pingURL(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve({ success: true, status: res.statusCode, data });
                } else {
                    resolve({ success: false, status: res.statusCode, data });
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Main function
async function notifySearchEngines() {
    log('\n' + '='.repeat(60), 'bright');
    log('🔔 Notifying Search Engines about Sitemap', 'bright');
    log('='.repeat(60) + '\n', 'bright');

    const encodedSitemapURL = encodeURIComponent(SITEMAP_URL);

    const searchEngines = [
        {
            name: 'Google',
            url: `https://www.google.com/ping?sitemap=${encodedSitemapURL}`
        },
        {
            name: 'Bing',
            url: `https://www.bing.com/ping?sitemap=${encodedSitemapURL}`
        }
    ];

    log(`📍 Sitemap URL: ${SITEMAP_URL}\n`, 'blue');

    for (const engine of searchEngines) {
        try {
            log(`🔄 Pinging ${engine.name}...`, 'yellow');

            const result = await pingURL(engine.url);

            if (result.success) {
                log(`✅ ${engine.name}: Successfully notified (Status: ${result.status})`, 'green');
            } else {
                log(`⚠️  ${engine.name}: Notification sent but got status ${result.status}`, 'yellow');
            }
        } catch (error) {
            log(`❌ ${engine.name}: Failed - ${error.message}`, 'red');
        }
    }

    log('\n' + '='.repeat(60), 'bright');
    log('📝 Notes:', 'bright');
    log('  • Search engines may take time to process the notification', 'blue');
    log('  • This does not guarantee immediate indexing', 'blue');
    log('  • For faster indexing, use Google Search Console', 'blue');
    log('  • Run this script whenever you update your sitemap', 'blue');
    log('='.repeat(60) + '\n', 'bright');
}

// Run the script
notifySearchEngines().catch((error) => {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
});
