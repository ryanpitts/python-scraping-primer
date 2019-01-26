# Web Scraping with Python: A Primer

Web scraping is the process of grabbing data from the internet, turning structured or semi-structured data on a web page into clean data you can use for analysis.

For this one-hour workshop at NICAR 2019, we'll (do our best to) work through these three scripts to turn you into a scraping pro:

* [scraper-0](scraper-0.ipynb): A super simple example to illustrate the basics, getting data from a single table in a file we've stored locally.
* [scraper-1](scraper-1.ipynb): A slightly more complex example that fetches real data (in this case, court hearings) that we might want to get from the web. If we don't have a strong internet connection, we have a backup copy of the page stored locally.
* [scraper-2](scraper-2.ipynb): An example that adds one more step of complexity, scraping a dataset (FDA warnings) that's broken across multiple web pages.

## Best practices

* Ask for the data first! The most reliable scraper is the one you don't have to write. Consider reaching out to a contact person who could share it with you in a structured format, or look for an API you might use.
* If you're making multiple HTTP requests, use a sleep timer to pause between then. That way you won't take down a web server or get your IP address banned.
* As you build your scraper, save a local copy of the HTML page to test against.
* Pass headers with your scraping requests. You can even use them to include contact information.
* Check the site you're scraping for terms of service, just to make sure you aren't violating them.

## Some advantages of writing your own scraper

* You can use a scheduler to run a scraper automatically, regularly updating your dataset.
* You don't have to rely on a third-party service to stick around—you're in control of your code.
* Storing your scrapers in GitHub means they're easy to share, so others can check your work and reproduce your analysis.
* You can control just what data you save, and even do transformations on the way into your CSV.

## One key limitation

* If the site you're scraping makes any changes—even something that just seems cosmetic!—it can break your scraper.

## Resources

This workshop shares approaches and borrows some structure from some other great workshops!

* [Melissa Lewis' Web Scraping for Journos](https://github.com/meli-lewis/web-scraping-for-journos)
* [Matt Wynn's IRE Scraping 2018](https://github.com/mattwynn1/IRE-scraping-2018)
* [Cody Winchester's 2018 IRE Coding for Journalists Python Boot Camp](https://github.com/ireapps/cfj-2018)
* [Forest Gregg's Intro to Scraping](https://github.com/fgregg/scraping-intro)
