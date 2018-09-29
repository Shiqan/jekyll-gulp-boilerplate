---
layout: page
title: "Frequently Asked Questions"
excerpt: "What can we help you with?"
---

{% for faq in site.faqs %}
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ faq.title }}
            </p>
            <a href="{{ faq.url }}" class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-angle-right" aria-hidden="true"></i>
            </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                {{ faq.excerpt }}
            </div>
        </div>
    </div>
{% endfor %}