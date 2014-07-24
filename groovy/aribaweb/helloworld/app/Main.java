package app;

import ariba.ui.aribaweb.core.AWComponent;

import java.util.List;
import java.util.ArrayList;

public class Main extends AWComponent
{
    public static class Entry {
        public String name;
        public String comment;
    }

    public Entry _current = new Entry(), _item;
    public List<Entry> _entries = new ArrayList();

    public void add ()
    {
        _entries.add(_current);
        _current = new Entry();
    }
}
