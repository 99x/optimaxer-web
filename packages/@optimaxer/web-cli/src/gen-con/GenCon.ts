import { AbstractAction } from "../AbstractAction.js";
import Crawler from "crawler";
import * as cheerio from 'cheerio';
import Sitemapper from 'sitemapper';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import * as fs from 'fs';
import ora from "ora";

export class GenCon extends AbstractAction {
    crawler:Crawler;
    nhm:NodeHtmlMarkdown = new NodeHtmlMarkdown();

    constructor() {
        super();
        this.crawler = new Crawler({
            maxConnections: 16,
        });
    }

    public async run(options:any):Promise<void> {


        const url:string = options.u;
        this.siteMapExtractor(url);
    }


    async siteMapExtractor(url:string):Promise<void> {
        
        const sitemapper = new Sitemapper.default({
            url: url,
            timeout: 30000
        });

        const { sites } = await sitemapper.fetch();

        let index:number = 0;
        for (let i = 0; i < sites.length; i++) {
            const commandSpinner = ora(`Extracting Content #${index} of ${sites.length}`).start();

            const html = await this.crawler.send(sites[i]);
            const $ = cheerio.load(html.body);

            $('nav').remove();
            $('footer').remove();
            $('header').remove();

            
            const mdContent:string = this.nhm.translate($.html());

            // write to file


            console.log(mdContent.length);

            if(mdContent.length > 0) {
                fs.writeFileSync(`./content-${i}.md`, mdContent);
                commandSpinner.succeed(`Content #${index} of ${sites.length} extracted.`);
                index++;
            } else {
                commandSpinner.info(`Content #${index} of ${sites.length} is empty.`);
            }
        }

        
    }
}