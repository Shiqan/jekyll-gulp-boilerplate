---
layout: page
permalink: /tag/
title: "Tag Index"
excerpt: "An archive of posts sorted by tag frequency."
---

{{ page.excerpt | markdownify }}

<ul class="entries-columns">
  {% assign sorted_tags = site.tags | sort_tags_by_name %}
  {% for tag in sorted_tags %}
    <li>
      <a href="/tag/{{ tag[0] | replace:' ','-' | downcase }}/">
        <strong>{{ tag[0] }}</strong> <span class="count">{{ tag[1] }}</span>
      </a>
    </li>
  {% endfor %}
</ul>
