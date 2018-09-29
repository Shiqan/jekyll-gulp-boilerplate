---
title: "Hello Bulma"
excerpt: "Testing Bulma components with Liquid Tags."
last_modified_at: 2018-09-06T20:38:55-04:00
image:
  feature: &image /assets/images/600x480.png
  thumbnail: /assets/images/600x480.png
  alt: "image alt text"
categories: [test]
tags: [Jekyll, web development, design, open source, CMS]
---

{% notification success %}
  Primar lorem ipsum dolor sit amet, consectetur
  adipiscing elit lorem ipsum dolor. **Pellentesque risus mi**, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum [felis venenatis](http://www.google.com) efficitur. Sit amet,
  consectetur adipiscing elit
{% endnotification %}

{% message type: "link" | title: "Hello Bulma" %}
  Primar lorem ipsum dolor sit amet, consectetur
  adipiscing elit lorem ipsum dolor. **Pellentesque risus mi**, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum [felis venenatis](http://www.google.com) efficitur. Sit amet,
  consectetur adipiscing elit
{% endmessage %}

{% progress class: "is-danger" | value: 10 | max: 100 %}

{% image class: "is-128x128"%}
![alt text](https://bulma.io/images/placeholders/128x128.png "Logo Title Text 1")
{% endimage %}