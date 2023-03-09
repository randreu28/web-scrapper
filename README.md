## What is this?

THis is a simple Web scrapper API built with [Deno](https://deno.land/). I made it to test out the deno enviorment and get a bit familiar with it's workflow. Nothing fancy! Just me experimenting with new technologies.

https://randreu28-web-scrapper.deno.dev/


## How it works

The API intends to filter through the content of a given website and returns the content as json. Here's a functional endpoint example, which takes the title DOM element from google:

https://randreu28-web-scrapper.deno.dev/?url=https://www.google.com&filter-type=tag&filter=title

All endpoints require 3 search parameters:

- A url 
- A filter type (Wich can be "id", "class" or "tag")
- A filter (The name of the id, class or tag DOM elements that you wan their text content to be returned)
