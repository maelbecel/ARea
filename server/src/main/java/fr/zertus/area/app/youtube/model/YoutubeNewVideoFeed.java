package fr.zertus.area.app.youtube.model;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Unmarshaller;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.io.StringReader;

@XmlRootElement(name = "feed", namespace = "http://www.w3.org/2005/Atom")
public class YoutubeNewVideoFeed {
    @XmlElement(name = "title")
    public String title;

    @XmlElement(name = "updated")
    public String updated;

    @XmlElement(name = "entry")
    public Entry feedEntry;

    public static class Entry {
        @XmlElement(name = "id")
        public String id;

        @XmlElement(name = "yt:videoId", namespace = "http://www.youtube.com/xml/schemas/2015")
        public String videoId;

        @XmlElement(name = "yt:channelId", namespace = "http://www.youtube.com/xml/schemas/2015")
        public String channelId;

        @XmlElement(name = "title")
        public String entryTitle;

        @XmlElement(name = "link")
        public Link entryLink;

        @XmlElement(name = "author")
        public Author entryAuthor;

        @XmlElement(name = "published")
        public String published;

        @XmlElement(name = "updated")
        public String entryUpdated;
    }

    public static class Link {
        @XmlElement(name = "rel")
        public String rel;

        @XmlElement(name = "href")
        public String href;
    }

    public static class Author {
        @XmlElement(name = "name")
        public String name;

        @XmlElement(name = "uri")
        public String uri;
    }

    public static YoutubeNewVideoFeed unmarshal(String xml) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(YoutubeNewVideoFeed.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        StringReader reader = new StringReader(xml);
        return (YoutubeNewVideoFeed) unmarshaller.unmarshal(reader);
    }
}
