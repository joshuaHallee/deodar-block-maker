const fse = require('fs-extra');

const bnBase = process.argv[2]; // media text (user input)

const wordArray = bnBase.split(" ");
const capitalizedWordArray = [];

wordArray.forEach(word => {
    const capitalizedLetter = word[0].toUpperCase();
    const rest = word.slice(1).toLowerCase();

    capitalizedWordArray.push(capitalizedLetter + rest);
});

const bnSpaceLowercase = bnBase.toLowerCase(); // media text
const bnSpaceUppercase = capitalizedWordArray.join(' ') // Media Text
const bnUnderscoreLowercase = bnSpaceLowercase.split(" ").join("_"); // media_text
const bnUnderscoreUppercase = bnSpaceUppercase.split(" ").join("_"); // Media_Text
const bnKebab = bnSpaceLowercase.split(" ").join("-"); // media-text

// file paths
const block = `./blocks/${bnKebab}/class-${bnKebab}.block.php`;
const php = `./blocks/${bnKebab}/${bnKebab}.php`;
const scss = `./blocks/${bnKebab}/${bnKebab}.scss`;

async function makeBlock (f) {
    try {
        await fse.outputFile(f,
`<?php 

class ${bnUnderscoreUppercase}_Block extends Deodar_Block{

    public static string $key = '${bnKebab}';
    
    public static array $options = array(
        'title' => '${bnSpaceUppercase}',
        'description' => '',
        'category' => 'common',
        'supports' => array(
            'jsx' => true
        )
    );

    public static array $fields = array(
        array(
            'key' => '${bnUnderscoreLowercase}_field_0',
            'label' => 'Title',
            'name' => '${bnUnderscoreLowercase}_title',
            'type' => 'text'
        )
    );

    public static array $params = array(
        'script' => false,
    );
}`);
    } catch (err) {
        console.error(err)
    }
}

async function makePhp (f) {
    try {
        await fse.outputFile(f, '');
    } catch (err) {
        console.error(err)
    }
}
async function makeScss (f) {
    try {
        await fse.outputFile(f, '');
    } catch (err) {
        console.error(err)
    }
}

makeBlock(block)
makePhp(php)
makeScss(scss)