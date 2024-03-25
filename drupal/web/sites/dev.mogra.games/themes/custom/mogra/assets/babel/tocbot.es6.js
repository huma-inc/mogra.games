import tocbot from 'tocbot';

tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-tocbot',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.body_paragraphs',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h2, h3',
  // For headings inside relative or absolute positioned containers within content.
  hasInnerContainers: true,
  // Smooth scrolling enabled.
  scrollSmooth: true
});
