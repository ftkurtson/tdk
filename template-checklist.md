#BaseKit Template Quality Checklist 

##Version 7.27 (RC)

`Quality of Build` is of the upmost importance to BaseKit Template Designers. Building templates for BaseKit customer comsumption requires a level of quality that must be hit before we release them into the wild. Every feature in the template must work with its respective editor feature.  Every point on this list must be checked before we release your template.

###Publish Site
* Publish the template to bksites.net domain
* Put URL into Templates Spreadsheet

###Browsers / Responsive Testing
* Test in all desktop browsers (Firefox, Chrome, IE, Safari)
* Test for different devices / browser sizes
* Test image sizes and positioning
* Test navigation

###Optimisation
* File sizes (nothing more than 500KB)

###Font Swatches
* Check all type relevant styles are linked to the metadata.json file correctly 1 comment
* Check font family and stack
* Check font colours are linked to the correct colour swatches

###Colour Swatches
* All colours are linked to the metadata.json file correctly
* At least 2 colour swatches, optimum of 5
* Overall legibility and visibility

###Typography
* Style accordingly in your template and then test in the editor
* Headings (h1 to h4 in particular)
* a (hover & active optional)
* Paragraph
* Lists (bulleted and numbered)
* Bold, Italics, Strikethrough and Underline
* Text alignment
* Text resizing
* Blockquote
* Code (pre)

###Template Files & Assets
* Create files but also test if editor is using the correct templates
* Check graphics are linked in the template correctly
* Check if thumbnail matches template and is linked correctly
* default.twig
* home.twig (optional)
* about.twig (optional)
* contact.twig (optional)
* gallery.twig (optional)
* menu.twig (optional)
* bloglist.twig (optional)
* blogpost.twig (optional)
* metadata.json
* thumbnail.png

###Content Accommodation
* Check if all images are editable
* Check if all text is editable
* Check that logo area works with portrait and landscape graphics
* Check that design doesn't break when hiding a 'baked in' widget

###Widget Checklist
* General form design
* Sign-up form design
* General button design
* PayPal button design (with icon)
* Dropbox button design (with icon)
* Social button designs (with icons)
* Tweet button design (with icon)
* Twitter feed design
* Column widget structure and styling
* Alignment options work correctly
* Gallery grid
* Slideshow buttons and captions
* YouTube embed (just make sure its visible, no design work required)
* Feature section design and styling

###Menu Checklist
* Menu item and promoted item design
* Menu section design
* Menu column design
* Dietary icon styling
* Menu subsection and promoted subsection design

###Blog Checklist
* Blog post design
* Categories and Tags design
* Timestamp design
* Blog post list design
* Blog post single design
* Blog image styling
* Blog search form styling

###Ecommerce Checklist
* Checkout section design
* Delivery form design
* Delivery select box styling
* Order, categories, tags, select boxes styling
* Product list styling
* Product item styling
* Checkout button styling
* Checkout page styling
* Category, Tags, Item name links all work
* Image column check
* Select box design

###Sample Text Content for Text Widget


<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<small>A small element</small>

<a href="#" title="A link">A link</a>

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut <u>underline element</u> labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <i>italicised element</i> laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in <a href="#" title="a link">a link</a> reprehenderit in voluptate velit esse cillum <strong>bold text</strong> dolore eu fugiat nulla pariatur. Excepteur <span>span element</span> sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<ul>
<li>An item</li>
<li>An item</li>
<li>An item</li>
<li>An item</li>
<li>An item</li>
</ul>

<ol>
<li>Item one</li>
<li>Item two</li>
<li>Item three</li>
<li>Item four</li>
<li>Item five</li>
</ol>

<strong>Bold text</strong>
<i>Italicised element</i>
<u>Underline element</u>

<blockquote>A simple blockquote</blockquote>
<pre>A line of code</pre>
<code>Another line of code</code>

<span>Span element</span>


###Sample Blog Content

```
Lorem ipsum dolor sit amet

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra viverra vestibulum. Nulla feugiat dapibus leo ac egestas. Nam luctus vel diam vel dignissim. Nam eu quam sit amet diam porttitor scelerisque. In tristique lorem orci, id consectetur libero ullamcorper non. Fusce sit amet orci turpis. Praesent faucibus sapien at dolor mattis bibendum. Maecenas risus tortor, auctor vitae purus posuere, mollis mattis mauris. Pellentesque vestibulum, turpis eu tempor auctor, odio erat blandit ipsum, id suscipit erat justo ut tellus. Nunc fermentum purus nec purus adipiscing, et volutpat erat commodo. Proin malesuada libero eget risus bibendum aliquet. Nulla sit amet congue purus.

Vivamus aliquam id nibh non molestie. Donec varius lectus mauris, euismod lacinia ante suscipit ut. Etiam et mattis tortor. Donec ornare, lorem sed gravida commodo, neque dui sodales odio, sed tempus nunc orci non urna. Sed congue dolor auctor, posuere orci in, consequat tortor. 

Suspendisse potenti. Pellentesque at ligula vitae erat convallis sollicitudin. Quisque id mollis nibh. Mauris vel auctor nisi. Nulla sagittis, mi vitae egestas gravida, arcu libero rhoncus libero, ac semper metus diam et nulla. 

Cras id mi at felis convallis pretium. Integer egestas est sed tincidunt vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.


Vivamus aliquam id nibh non molestie
Nulla quam ante, porttitor sed dapibus eu, pellentesque eu velit. Vivamus a magna a lectus dignissim porttitor a id elit. Vestibulum dignissim lacinia nisi, ut tempor neque tempus ac. Aliquam eu ante in libero suscipit porttitor. Morbi magna magna, convallis eu dictum eleifend, gravida sed nunc. Fusce sed libero mollis, mollis nunc quis, iaculis lorem. Etiam eu elementum lorem, eu molestie ante.

Morbi aliquam velit nec augue hendrerit viverra. Curabitur nibh ante, malesuada nec sodales et, ornare et lorem. Cras quis placerat dui. Vivamus ante dui, tempus a laoreet faucibus, rutrum ut sem. Fusce faucibus dui vel auctor mollis. Aenean sed tincidunt felis, vitae posuere justo. Duis condimentum mauris sem, vel luctus neque sollicitudin quis. Mauris at leo sit amet neque sodales malesuada vitae et ante. Integer tempus, enim vitae venenatis ullamcorper, massa mauris cursus tortor, a tempor erat neque ac nisl. Nullam eget nibh enim. Nulla ut erat eu enim pulvinar feugiat. 

Maecenas adipiscing, purus ut fringilla rhoncus, nisi sem consectetur augue, non dignissim augue nulla lacinia felis. Donec tincidunt venenatis tellus, sit amet sodales nulla vulputate sit amet.


Nulla quam ante
Sed pharetra orci gravida, convallis ipsum sed, bibendum mauris. Maecenas molestie, augue eu sagittis vulputate, sem nunc lacinia lectus, eu semper magna erat vel tellus. Nunc sit amet lacinia turpis, sed semper ante. Ut malesuada facilisis arcu eget viverra. Nullam facilisis ante sit amet mattis sodales. Sed in ligula vehicula, commodo lorem vitae, molestie leo. Vestibulum at odio a velit consequat dictum. Sed pellentesque tellus eu neque luctus consectetur. 

Nam tempor sed lorem sit amet sodales. Aliquam tempor, elit nec lobortis volutpat, nunc lectus dignissim magna, vitae porttitor massa velit dapibus lectus. Vestibulum ut orci pretium, vehicula odio ut, tempor augue. Mauris vestibulum risus nec dolor rutrum posuere. Sed posuere viverra purus, in hendrerit turpis vestibulum et. Donec eu quam ut diam lobortis pulvinar. Vestibulum dignissim libero sed libero varius molestie porttitor eu tellus. Sed at convallis ipsum, eget interdum lectus.


Morbi aliquam velit nec augue hendrerit viverra
Nulla quam ante, porttitor sed dapibus eu, pellentesque eu velit. Vivamus a magna a lectus dignissim porttitor a id elit. Vestibulum dignissim lacinia nisi, ut tempor neque tempus ac. Aliquam eu ante in libero suscipit porttitor. Morbi magna magna, convallis eu dictum eleifend, gravida sed nunc. Fusce sed libero mollis, mollis nunc quis, iaculis lorem. Etiam eu elementum lorem, eu molestie ante.
Morbi aliquam velit nec augue hendrerit viverra. Curabitur nibh ante, malesuada nec sodales et, ornare et lorem. 

Cras quis placerat dui. Vivamus ante dui, tempus a laoreet faucibus, rutrum ut sem. Fusce faucibus dui vel auctor mollis. Aenean sed tincidunt felis, vitae posuere justo. Duis condimentum mauris sem, vel luctus neque sollicitudin quis. Mauris at leo sit amet neque sodales malesuada vitae et ante. Integer tempus, enim vitae venenatis ullamcorper, massa mauris cursus tortor, a tempor erat neque ac nisl. 

Nullam eget nibh enim. Nulla ut erat eu enim pulvinar feugiat. Maecenas adipiscing, purus ut fringilla rhoncus, nisi sem consectetur augue, non dignissim augue nulla lacinia felis. Donec tincidunt venenatis tellus, sit amet sodales nulla vulputate sit amet.

```

###Menu Sample Content

```

Porridge
10.00
These brilliant porridge recipes will give you great ideas to jazz up this breakfast favourite. Fruity, syrupy or nutty – give it a go.

Pancake Fun
3.00
Small helping of pancake topped with some crazy fruit.Small helping of pancake topped with some crazy fruitSmall helping of pancake topped with some crazy fruitSmall helping of pancake topped with some crazy fruit.

Craziness on Toast
5.00
5 pieces of heaven on toast.

Beef Slices & Traditional Veg
13.00
Traditional British Style Veg.

Winter Warming Chilli
14.00
Hey look! I instragramed my food! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget luctus lectus, a venenatis ipsum. Mauris quis accumsan sapien. Mauris lobortis condimentum malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing.

The Mexican Criminal
11.00
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget luctus lectus, a venenatis ipsum. Mauris quis accumsan sapien. Mauris lobortis condimentum malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque risus.

Chocolate Cake
4.30
Suspendisse nibh dolor, ullamcorper ac vulputate at, volutpat eget neque. Ut orci purus, malesuada nec nisi at, consectetur volutpat mi. Nunc tincidunt porta nulla nec ornare. Nulla vitae diam rhoncus, tempus arcu eu, facilisis eros. Duis et varius mi, eg.

Strawberry Ripple Cheesecake
4.50
Fusce sapien felis, accumsan sit amet vehicula nec, dignissim id nisi. Donec lacinia in turpis dignissim gravida. Suspendisse potenti. Donec eu lacinia metus, eget elementum nibh. Donec aliquam dignissim ipsum non placerat. Ut aliquam dignissim facilisis.
```