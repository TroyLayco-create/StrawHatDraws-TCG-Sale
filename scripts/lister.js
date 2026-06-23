const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function run() {
    const files = fs.readdirSync('listings');
    
    for (const file of files) {
        if (file.endsWith('.jpg')) {
            const cardName = file.replace('.jpg', '').replace(/-/g, ' ');
            
            // This adds the listing to your Supabase 'cards' table
            const { error } = await supabase.from('cards').insert([{
                name: cardName,
                price: 100, // We can refine this later
                stock: 1,
                front_img: `https://raw.githubusercontent.com/YOUR_GITHUB_USER/YOUR_REPO/main/listings/${file}`
            }]);
            
            if (error) console.error("Error adding card:", error);
            else console.log("Added:", cardName);
        }
    }
}
run();
