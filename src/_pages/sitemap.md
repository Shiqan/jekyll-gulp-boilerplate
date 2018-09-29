---
layout: page
title: "Sitemap"
excerpt: "Sitemap"
---

<h2>Pages</h2>
<ul>
{% for link in site.data.navigation.primary.links %}
    {% if link.sub-menu %}
    <li>
      <a href="{{ link.url }}">
        {{ link.title | escape }}
      </a>
        <ul>
                        {% for sublink in link.sub-menu %}
                          <li>
      <a href="{{ link.url }}">
        {{ link.title | escape }}
      </a>
    </li>
                {% endfor %}

        </ul>
    </li>


    {% else %}
    <li>
      <a href="{{ link.url }}">
        {{ link.title | escape }}
      </a>
    </li>
    {% endif %}

{% endfor %}

</ul>

<h2><a href="/articles/">Articles</a></h2>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title | markdownify | remove: '<p>' | remove: '</p>' }} </a>
    </li>
  {% endfor %}
</ul>
