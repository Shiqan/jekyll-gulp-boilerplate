module Jekyll
  module Bulma
    class NotificationTag < Liquid::Block
      # https://bulma.io/documentation/elements/notification/

      def initialize(tag_name, type, tokens)
        super
        type.strip!
        if %w(primary link info success warning danger).include?(type)
          @type = "is-" + type
        else
          @type = ""
        end
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        output = converter.convert(super(context)).gsub(/<\/?p[^>]*>/, '').chomp; 
        "<div class=\"notification #{@type}\">#{output}</div>"
      end
    end

    class MessageTag < Liquid::Block
      # https://bulma.io/documentation/components/message/

      def initialize(tag_name, markup, tokens)
        @markup = markup
        super
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        # Render any liquid variables
        markup = Liquid::Template.parse(@markup).render(context)

        # Extract tag attributes
        attributes = {}
        markup.scan(Liquid::TagAttributes) do |key, value|
          attributes[key] = value
        end

        @type = attributes['type']
        @title = attributes['title']

        @type.strip!
        if %w(dark primary link info success warning danger).include?(@type)
          message_type = "is-" + @type
        else
          message_type = ""
        end
        
        unless @title.nil?
          message_title = @title.gsub!(/\A"|"\Z/, '')
          message_title = converter.convert(message_title)
          message_title = "<p>#{message_title}</p>"
        end

        output = converter.convert(super(context)).gsub(/<\/?p[^>]*>/, '').chomp;
        "<article class=\"message #{message_type}\"><div class=\"message-header\">#{message_title}</div><div class=\"message-body\">#{output}</div></article>"
      end
    end

    class ImageTag < Liquid::Block
      # https://bulma.io/documentation/elements/image/

      def initialize(tag_name, markup, tokens)
        @markup = markup
        super
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        # Render any liquid variables
        markup = Liquid::Template.parse(@markup).render(context)

        # Extract tag attributes
        attributes = {}
        markup.scan(Liquid::TagAttributes) do |key, value|
          attributes[key] = value
        end

        @class = attributes['class']

        # Class name(s)
        unless @class.nil?
          figure_class = @class.gsub!(/\A"|"\Z/, '')
        end

        output = converter.convert(super(context)).gsub(/<\/?p[^>]*>/, '').chomp;
        "<figure class=\"image #{figure_class}\">#{output}</figure>"
      end
    end

    class ProgressTag < Liquid::Tag
      # https://bulma.io/documentation/elements/progress/

      def initialize(tag_name, markup, tokens)
        @markup = markup
        super
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        # Render any liquid variables
        markup = Liquid::Template.parse(@markup).render(context)

        # Extract tag attributes
        attributes = {}
        markup.scan(Liquid::TagAttributes) do |key, value|
          attributes[key] = value
        end

        @class = attributes['class']
        @value = attributes['value']
        @max = attributes['max']

        # Class name(s)
        unless @class.nil?
          progress_class = @class.gsub!(/\A"|"\Z/, '')
        end

        unless @max.nil?
          @max = "100"
        end

        unless @value.nil?
          @value = "100"
        end

        output = converter.convert(super(context)).gsub(/<\/?p[^>]*>/, '').chomp;
        "<progress class=\"progress #{progress_class}\" value=\"#{@value}\" max=\"#{@max}\">#{@value}</progress>"
      end
    end
  end
end


Liquid::Template.register_tag('notification', Jekyll::Bulma::NotificationTag)  
Liquid::Template.register_tag('message', Jekyll::Bulma::MessageTag)
Liquid::Template.register_tag('image', Jekyll::Bulma::ImageTag)
Liquid::Template.register_tag('progress', Jekyll::Bulma::ProgressTag)