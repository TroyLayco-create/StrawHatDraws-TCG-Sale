const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function run() {
    console.log("Checking folder: listings/");
    const files = fs.readdirSync('listings');
    console.log("Files found:", files);
    
    for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png')) {
            console.log("Found file:", file);
            
            const cardName = file.replace(/\.[^/.]+$/, "").replace(/-/g, ' ');
            
            console.log("Attempting to insert:", cardName);
            
            const { data, error } = await supabase.from('cards').insert([{
                name: cardName,
                price: 100, 
                stock: 1,
                front_img: `https://raw.githubusercontent.com/YOUR_GITHUB_USER/YOUR_REPO/main/listings/${file}`
            }]);
            
            if (error) {
                console.error("CRITICAL ERROR DURING INSERT:", error);
            } else {
                console.log("SUCCESS: Inserted", cardName);
            }
        }
    }
}
run();
