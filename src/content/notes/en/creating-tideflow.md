---
title: "Why Markdown at All?"
description: "A deep dive into the workflow that led to the creation of Tideflow, a Markdown to PDF editor."
date: 2025-10-24T00:00:00.000Z
lang: en
show_on_homepage: true
---

## Why markdown at all?

This all started 4-5 years back when I first started noticing more and more markdowns files popping up in my workflow. I was and still am a naturally very curious person. Which was why I was busy with academia, learning latin, learning coding and bunchmore things that would require me to write some things down. Skip forward 1-2 years and I found myself defaulting to this workflow.

-Write down whatever you want to write without format, as plain text
-Give an reference doc with the layout and format you want to an AI 
-Then ask the AI to reformat the text and fix the layout without changing the content

While this was hit and miss when LLMs were first start becoming popular but the results got progressively better as LLMs got better at their job. 

As you can guess, one of the main bottlenecks of this workflow was the transfer process of the text itself. I first started by trying to use Word and tried to copy and paste content. That quickly become inefficent as the text files got longer (and I despise Word such a heavy and clumsy program for what it needs to do) - so I switched trying to send the whole docx files and that didn't help either as AIs didn't play nicely with Word docs and  the text layout almost inevitably broken. That's when I noticed markdown files. They were small nifty files that stored text like a txt file would. They were easier to transfer and for some reason, AIs worked much better with MD files then any other text format I tried (and I suspect it is because LLMs have been taught with lots of MD files so they feel comfortable navigating around them). Then I also found out about the diverse ecosystem built around them and I was hooked. 

Since 2022, I have been using markdown as my main text format. Especially since I have also fallen love with Notepad++ which is just a phenomenal software itself. All my lecture notes, essays, worlbuilding ideas, journals etc. originally start as markdown files which I later convert to some other format for sharing. I do this because I discovered that other people are not so keen on markdown format as I am. Who knew people didn't like reading walls of text? 

Writing output has been greatly increased and I was productive more then ever (at least in writing sense) but its kind of a moot victory when you can't easily share the fruit of your labor with others. My meticulisly kept notes would prove too hard to read for my friends, my setting notes for my ttprg campaing mostly shared the same fate. I have tried numereous converters to convert my md files into much more sharable PDFs, yet no matter how much I looked I couldn't find one where I could easily see the end product I am going to get while I am typing.

In the world of markdown to pdf editors, the general stragety (and its a good stragety) seems to be to convert the markdown content into a stylised HTML page and then utilize the print feature to save it as a PDF. Nothing is wrong with this approach and it gives out a great approximation for what you are going to get. But it is an approximation after all and it is basicly impossible to exactly see what you are going to get until you open the exported PDF. While this style of appromixete preview and rendering could work for others. I get obsessed about little details of my work, like preciesly where one page ends and one page starts. Even if I could insert manual page breaks into the markdown text, the HTML previews wouldn't render that until it is exported. And did you know that good PDF editors doesnt exist? Like literarlly, even if I was okay with adding an step and editing the PDFs myself, I couldn't find a good editor to edit PDFs.

So this grinded my workflow to a halt. Being a bit of a perfectioniost will do that to you. When I sit down to write, I would like to only focus on the writing part itself. Ideally, I would have some preset themes to handle the layout and style part. And I couldn't figure out how to set up this ideal workflow with markdown files. And that's when I realised that If I wanted an app suitable for my workflow, my only (logical) option was to build a new kind of markdown editor from strach. I had a very clear vision, I wanted to do all my writing and styling without leaving the same app window and end up with an md file for myself and stylised PDF ready for sharing/publishing. With that vision I skecthed a quick app;

-A simple markdown editor with user friendly toolbar on the left
-Accurately rendered and paginated PDF preview of the exact render you are going to get on the right
-An easy to use design menu with premade themes and custom theme options.

So I wrote a basic design document outlying this idea and saved it in markdown. Then I did what I do best and fell into numerous rabbit holes, some are related some are not. Short version is that, I settled on typst which is a blazing fast converter. It uses its own file system (.typ or something) and converts it in to PDF in blazing fast speeds. Much to may dismay, Typst's own editor also doesn't come with true pagianation and relies on the same HTML to print pipeline. But that incredibly fast rendering time gave me an idea. If the conversion is nearly instantaneous, why bother with an approximation at all?

## Everything is a copy of a copy of a copy...

So, remember how normally most Markdown to pdf convertors, render an htlm preview real-time as you type and use it as an approximation? So I taught why not skip the middle man and get the preview straight from the source - the pdf. So the idea was that the moment user opens an md file (well technicly, the process is little more complicated if PDF preview is hidden in the app), the app would automaticly export it as pdf in the background and it will just serve this temp.pdf file as the preview. Add in an invisible layer of processing where we inject invisible anchors into the markdown that correspond to locations in the PDF, allowing the two windows to scroll in perfect (not really, more like %70 accurate but good enough) synch and voila you got a markdown editor with true live PDF review (Of course you need to scrub those anchors, before you are properly exporting but thats pretty trivial.). 

Of course, this is a gross simplification of the process, but that’s essentially how the core development came together. It was an immensely enjoyable project, and I’m genuinely happy with how TideFlow turned out.

If you have any questions about its development or made anything cool using it (or just want to chat about it) feel free to reach out at denizburakkoca@gmail.com.