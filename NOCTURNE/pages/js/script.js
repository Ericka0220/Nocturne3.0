
/* =========================================
   NOCTURNE: THE VEIL NETWORK
   JAVASCRIPT BATCH 1
   Navigation & Core Interactions
========================================= */


/* =========================================
   1. WAIT FOR PAGE TO LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  console.log("NOCTURNE Network initialized.");

  initializeNavigation();
  initializeActivePage();
  initializePageTransitions();
  initializeBackToTop();
  initializeAccordions();
  initializeCopyButtons();

});


/* =========================================
   2. GLOBAL NAVIGATION
========================================= */

function initializeNavigation() {

  const navigation = document.querySelector(".main-navigation");

  if (!navigation) return;

  const links = navigation.querySelectorAll("a");

  links.forEach(link => {

    link.addEventListener("click", event => {

      const destination = link.getAttribute("href");

      if (!destination || destination.startsWith("#")) return;

      // Allow normal browser navigation.
      // This listener is reserved for future enhancements.

      console.log("Navigation selected:", destination);

    });

  });

}


/* =========================================
   3. ACTIVE PAGE HIGHLIGHTING
========================================= */

function initializeActivePage() {

  const currentPath = window.location.pathname;

  const navigationLinks = document.querySelectorAll(
    ".main-navigation a"
  );

  navigationLinks.forEach(link => {

    const linkPath = new URL(
      link.href,
      window.location.origin
    ).pathname;

    if (linkPath === currentPath) {

      link.classList.add("active");

      link.setAttribute("aria-current", "page");

    }

  });

}


/* =========================================
   4. PAGE TRANSITION EFFECT
========================================= */

function initializePageTransitions() {

  const internalLinks = document.querySelectorAll(
    "a[href]"
  );

  internalLinks.forEach(link => {

    link.addEventListener("click", event => {

      const href = link.getAttribute("href");

      // Ignore external links.
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const destination = new URL(
        href,
        window.location.href
      );

      // Ignore links to another website.
      if (destination.origin !== window.location.origin) {
        return;
      }

      // Ignore links to the same page.
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();

      document.body.classList.add("page-leaving");

      setTimeout(() => {

        window.location.href = destination.href;

      }, 180);

    });

  });

}


/* =========================================
   5. BACK TO TOP BUTTON
========================================= */

function initializeBackToTop() {

  const button = document.querySelector("#backToTop");

  if (!button) return;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

      button.classList.add("visible");

    } else {

      button.classList.remove("visible");

    }

  });

  button.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================
   6. ACCORDION SECTIONS
========================================= */

function initializeAccordions() {

  const accordionButtons = document.querySelectorAll(
    ".accordion-button"
  );

  accordionButtons.forEach(button => {

    button.addEventListener("click", () => {

      const content = button.nextElementSibling;

      if (!content) return;

      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      content.hidden = isOpen;

      button.classList.toggle("active", !isOpen);

    });

  });

}


/* =========================================
   7. COPY TEXT BUTTONS
========================================= */

function initializeCopyButtons() {

  const copyButtons = document.querySelectorAll(
    "[data-copy]"
  );

  copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

      const textToCopy = button.dataset.copy;

      if (!textToCopy) return;

      try {

        await navigator.clipboard.writeText(textToCopy);

        const originalText = button.textContent;

        button.textContent = "Copied!";

        setTimeout(() => {

          button.textContent = originalText;

        }, 1500);

      } catch (error) {

        console.error("Unable to copy text:", error);

      }

    });

  });

}


/* =========================================
   8. KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {

  // Press Home to return to the top.
  if (
    event.key === "Home" &&
    !["INPUT", "TEXTAREA"].includes(
      document.activeElement.tagName
    )
  ) {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

});


/* =========================================
   9. CURRENT YEAR
========================================= */

function updateCopyrightYear() {

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach(element => {

    element.textContent = new Date().getFullYear();

  });

}

document.addEventListener("DOMContentLoaded", updateCopyrightYear);


/* =========================================
   10. NETWORK STATUS
========================================= */

function initializeNetworkStatus() {

  const statusElement = document.querySelector(
    "#networkStatus"
  );

  if (!statusElement) return;

  function updateStatus() {

    if (navigator.onLine) {

      statusElement.textContent = "NETWORK CONNECTED";
      statusElement.classList.remove("offline");

    } else {

      statusElement.textContent = "NETWORK DISCONNECTED";
      statusElement.classList.add("offline");

    }

  }

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

  updateStatus();

}

document.addEventListener(
  "DOMContentLoaded",
  initializeNetworkStatus
);

/* =========================================
   NOCTURNE: THE VEIL NETWORK
   JAVASCRIPT BATCH 2
   GLOBAL ARCHIVE SEARCH
========================================= */


/* =========================================
   1. SEARCH DATABASE
   Add new records to this collection.
========================================= */

const nocturneSearchIndex = [

  {
    title: "The Archive",
    category: "Archive",
    description: "The central collection of documented entities, artifacts, case files, and supernatural records.",
    status: "VERIFIED",
    url: "pages/archive/archive.html",
    keywords: ["records", "database", "documents", "research"]
  },

  {
    title: "Unclassified Entities",
    category: "Entities",
    description: "A collection of unusual beings, unidentified creatures, and unexplained lifeforms.",
    status: "UNCONFIRMED",
    url: "pages/archive/entities.html",
    keywords: ["creatures", "monsters", "beings", "cryptids"]
  },

  {
    title: "Artifact Registry",
    category: "Artifacts",
    description: "Objects with unusual histories, properties, origins, and unexplained behavior.",
    status: "UNCONFIRMED",
    url: "pages/archive/artifacts.html",
    keywords: ["objects", "relics", "possessions", "items"]
  },

  {
    title: "Case Files",
    category: "Case Files",
    description: "Investigations, witness reports, field observations, and documented incidents.",
    status: "UNRESOLVED",
    url: "pages/archive/case-files.html",
    keywords: ["investigations", "reports", "incidents", "evidence"]
  },

  {
    title: "Historical Records",
    category: "History",
    description: "Historical accounts, old documents, folklore, and records connected to the Veil.",
    status: "DISPUTED",
    url: "pages/archive/historical-records.html",
    keywords: ["history", "folklore", "legends", "ancient"]
  },

  {
    title: "Phenomena Index",
    category: "Phenomena",
    description: "Unusual events, distortions, manifestations, and unexplained occurrences.",
    status: "UNCONFIRMED",
    url: "pages/archive/phenomena.html",
    keywords: ["events", "anomalies", "strange", "occurrences"]
  },

  {
    title: "The Known World",
    category: "Locations",
    description: "Regions and locations belonging to the ordinary geographical world.",
    status: "VERIFIED",
    url: "pages/realm/known-world.html",
    keywords: ["geography", "places", "regions", "maps"]
  },

  {
    title: "Veil Regions",
    category: "Locations",
    description: "Places believed to exist along or beyond the boundary separating ordinary reality from the Veil.",
    status: "UNCONFIRMED",
    url: "pages/realm/veil-regions.html",
    keywords: ["dimensions", "hidden places", "otherworld", "regions"]
  },

  {
    title: "The Beyond",
    category: "Locations",
    description: "An incomplete collection of records concerning places beyond the known boundaries of the Veil.",
    status: "UNRESOLVED",
    url: "pages/realm/the-beyond.html",
    keywords: ["unknown", "dimensions", "other worlds", "beyond"]
  },

  {
    title: "Expedition Records",
    category: "Expeditions",
    description: "Field journeys, exploration reports, recovered observations, and expedition histories.",
    status: "UNCONFIRMED",
    url: "pages/realm/expeditions.html",
    keywords: ["exploration", "fieldwork", "journeys", "travel"]
  },

  {
    title: "The Grimoire",
    category: "Magic",
    description: "A collection of fictional magical systems, disciplines, symbols, rituals, and theories.",
    status: "DISPUTED",
    url: "pages/grimoire/grimoire.html",
    keywords: ["spells", "magic", "witchcraft", "arcane"]
  },

  {
    title: "Magic Systems",
    category: "Magic",
    description: "Recorded systems of magic, their limitations, rules, and known theoretical foundations.",
    status: "UNCONFIRMED",
    url: "pages/grimoire/magic-systems.html",
    keywords: ["abilities", "power", "arcane", "rules"]
  },

  {
    title: "Ritual Records",
    category: "Magic",
    description: "Fictional ritual accounts, symbolic practices, and historical interpretations within the NOCTURNE universe.",
    status: "DISPUTED",
    url: "pages/grimoire/rituals.html",
    keywords: ["ceremonies", "symbols", "magic", "practices"]
  },

  {
    title: "Celestial Events",
    category: "Observatory",
    description: "Unusual celestial observations, strange alignments, and recorded astronomical events.",
    status: "UNCONFIRMED",
    url: "pages/observatory/celestial-events.html",
    keywords: ["stars", "planets", "sky", "astronomy"]
  },

  {
    title: "Temporal Anomalies",
    category: "Observatory",
    description: "Records involving unusual time perception, unexplained chronology, and temporal distortions.",
    status: "UNRESOLVED",
    url: "pages/observatory/temporal-anomalies.html",
    keywords: ["time", "chronology", "distortion", "time travel"]
  },

  {
    title: "Unidentified Entities",
    category: "The Unwritten",
    description: "Reports of beings that remain unidentified, unclassified, or absent from established records.",
    status: "UNRESOLVED",
    url: "pages/unwritten/unidentified-entities.html",
    keywords: ["unknown creatures", "missing identity", "unclassified"]
  },

  {
    title: "Lost Locations",
    category: "The Unwritten",
    description: "Places mentioned in incomplete accounts, missing maps, and fragmented witness reports.",
    status: "UNRESOLVED",
    url: "pages/unwritten/lost-locations.html",
    keywords: ["missing places", "lost cities", "hidden locations"]
  },

  {
    title: "Open Investigations",
    category: "The Unwritten",
    description: "Active mysteries, incomplete investigations, and questions that have not yet been answered.",
    status: "UNRESOLVED",
    url: "pages/unwritten/open-investigations.html",
    keywords: ["mysteries", "unknown", "research", "unsolved"]
  },

  {
    title: "Researchers Directory",
    category: "People",
    description: "Researchers, investigators, archivists, and individuals connected to the network.",
    status: "VERIFIED",
    url: "pages/archive/researchers.html",
    keywords: ["members", "people", "investigators", "staff"]
  },

  {
    title: "Network Departments",
    category: "Organization",
    description: "The divisions and departments responsible for the work of the Veil Network.",
    status: "VERIFIED",
    url: "pages/order/departments.html",
    keywords: ["organization", "teams", "divisions", "structure"]
  }

];


/* =========================================
   2. FIND THE WEBSITE ROOT
   Works from both root and nested pages.
========================================= */

function getNocturneRoot() {

  const scriptElement = document.querySelector(
    'script[src*="script.js"]'
  );

  if (!scriptElement) {
    return new URL("./", window.location.href);
  }

  const scriptURL = new URL(
    scriptElement.getAttribute("src"),
    window.location.href
  );

  return new URL("../", scriptURL);

}


/* =========================================
   3. INITIALIZE SEARCH
========================================= */

function initializeGlobalSearch() {

  const form = document.querySelector("#globalSearchForm");
  const input = document.querySelector("#globalSearchInput");
  const categoryFilter = document.querySelector("#searchCategory");
  const resultsContainer = document.querySelector("#globalSearchResults");
  const resultCount = document.querySelector("#searchResultCount");

  if (!form || !input || !resultsContainer) return;

  let currentResults = [];

  function performSearch() {

    const searchTerm = input.value
      .trim()
      .toLowerCase();

    const selectedCategory = categoryFilter
      ? categoryFilter.value
      : "all";

    if (!searchTerm) {

      resultsContainer.replaceChildren();

      showSearchMessage(
        "Enter a search term to explore the archive."
      );

      if (resultCount) {
        resultCount.textContent = "0 records found";
      }

      currentResults = [];

      return;
    }

    currentResults = nocturneSearchIndex.filter(record => {

      const searchableContent = [
        record.title,
        record.category,
        record.description,
        record.status,
        ...(record.keywords || [])
      ].join(" ").toLowerCase();

      const matchesTerm = searchableContent.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        record.category === selectedCategory;

      return matchesTerm && matchesCategory;

    });

    displaySearchResults(currentResults);

  }


  /* =====================================
     4. DISPLAY SEARCH RESULTS
  ===================================== */

  function displaySearchResults(results) {

    resultsContainer.replaceChildren();

    if (resultCount) {

      resultCount.textContent =
        `${results.length} record${results.length === 1 ? "" : "s"} found`;

    }

    if (results.length === 0) {

      showSearchMessage(
        "No matching records were discovered. Try another term or category."
      );

      return;

    }

    const rootURL = getNocturneRoot();

    results.forEach(record => {

      const article = document.createElement("article");
      article.className = "search-result-card";

      const heading = document.createElement("h3");

      const link = document.createElement("a");

      link.href = new URL(record.url, rootURL).href;
      link.textContent = record.title;

      heading.appendChild(link);

      const category = document.createElement("p");
      category.className = "search-result-category";
      category.textContent = record.category;

      const description = document.createElement("p");
      description.className = "search-result-description";
      description.textContent = record.description;

      const status = document.createElement("span");
      status.className = "status-label";
      status.textContent = record.status;

      article.appendChild(category);
      article.appendChild(heading);
      article.appendChild(description);
      article.appendChild(status);

      resultsContainer.appendChild(article);

    });

  }


  /* =====================================
     5. EMPTY SEARCH MESSAGE
  ===================================== */

  function showSearchMessage(message) {

    const paragraph = document.createElement("p");

    paragraph.className = "search-empty-message";
    paragraph.textContent = message;

    resultsContainer.replaceChildren(paragraph);

  }


  /* =====================================
     6. SEARCH EVENTS
  ===================================== */

  input.addEventListener("input", performSearch);

  if (categoryFilter) {
    categoryFilter.addEventListener("change", performSearch);
  }

  form.addEventListener("submit", event => {

    event.preventDefault();
    performSearch();

  });


  /* =====================================
     7. SEARCH CLEAR BUTTON
  ===================================== */

  const clearButton = document.querySelector("#clearSearch");

  if (clearButton) {

    clearButton.addEventListener("click", () => {

      input.value = "";

      if (categoryFilter) {
        categoryFilter.value = "all";
      }

      input.focus();
      performSearch();

    });

  }


  /* =====================================
     8. URL SEARCH SUPPORT
     Example: ?q=creature
  ===================================== */

  const urlParameters = new URLSearchParams(
    window.location.search
  );

  const startingQuery = urlParameters.get("q");

  if (startingQuery) {

    input.value = startingQuery;
    performSearch();

  } else {

    showSearchMessage(
      "Enter a name, subject, or keyword to begin your investigation."
    );

  }

}


/* =========================================
   9. START GLOBAL SEARCH
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeGlobalSearch
);

/* =========================================
   NOCTURNE: THE VEIL NETWORK
   JAVASCRIPT BATCH 3
   ARCHIVE FILTERING & SORTING
========================================= */


/* =========================================
   1. ARCHIVE CLASSIFICATIONS
========================================= */

const nocturneClassifications = [
  "VERIFIED",
  "UNCONFIRMED",
  "LEGENDARY",
  "DISPUTED",
  "UNRESOLVED"
];


/* =========================================
   2. INITIALIZE ARCHIVE FILTERS
========================================= */

function initializeArchiveFilters() {

  const archiveLists = document.querySelectorAll(
    "[data-archive-list]"
  );

  archiveLists.forEach(archiveList => {

    const container = archiveList.closest(
      "[data-archive-container]"
    ) || document;

    const categoryFilter = container.querySelector(
      "[data-archive-category]"
    );

    const statusFilter = container.querySelector(
      "[data-archive-status]"
    );

    const sortFilter = container.querySelector(
      "[data-archive-sort]"
    );

    const searchInput = container.querySelector(
      "[data-archive-search]"
    );

    const resultCount = container.querySelector(
      "[data-archive-count]"
    );

    const resetButton = container.querySelector(
      "[data-archive-reset]"
    );

    const emptyMessage = container.querySelector(
      "[data-archive-empty]"
    );

    const originalItems = Array.from(
      archiveList.querySelectorAll("[data-archive-item]")
    );

    if (originalItems.length === 0) return;


    /* =====================================
       3. READ ITEM INFORMATION
    ===================================== */

    function getItemValue(item, attribute) {

      return (
        item.dataset[attribute] || ""
      ).trim().toLowerCase();

    }


    /* =====================================
       4. FILTER ARCHIVE ITEMS
    ===================================== */

    function filterArchive() {

      const selectedCategory = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "all";

      const selectedStatus = statusFilter
        ? statusFilter.value.toLowerCase()
        : "all";

      const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

      let visibleItems = [];

      originalItems.forEach(item => {

        const category = getItemValue(item, "category");
        const status = getItemValue(item, "status");

        const searchableText = [
          item.dataset.title || "",
          item.dataset.description || "",
          item.dataset.keywords || "",
          item.textContent || ""
        ].join(" ").toLowerCase();

        const matchesCategory =
          selectedCategory === "all" ||
          category === selectedCategory;

        const matchesStatus =
          selectedStatus === "all" ||
          status === selectedStatus;

        const matchesSearch =
          !searchTerm ||
          searchableText.includes(searchTerm);

        const isVisible =
          matchesCategory &&
          matchesStatus &&
          matchesSearch;

        item.hidden = !isVisible;

        if (isVisible) {
          visibleItems.push(item);
        }

      });


      /* =====================================
         5. SORT RESULTS
      ===================================== */

      const sortMode = sortFilter
        ? sortFilter.value
        : "default";

      const sortedItems = [...visibleItems];

      if (sortMode === "alphabetical") {

        sortedItems.sort((a, b) => {
          return getItemValue(a, "title").localeCompare(
            getItemValue(b, "title")
          );
        });

      }

      else if (sortMode === "reverse") {

        sortedItems.sort((a, b) => {
          return getItemValue(b, "title").localeCompare(
            getItemValue(a, "title")
          );
        });

      }

      else if (sortMode === "status") {

        sortedItems.sort((a, b) => {

          const statusA = getItemValue(a, "status");
          const statusB = getItemValue(b, "status");

          const orderA = nocturneClassifications.indexOf(
            statusA.toUpperCase()
          );

          const orderB = nocturneClassifications.indexOf(
            statusB.toUpperCase()
          );

          return (
            (orderA === -1 ? 999 : orderA) -
            (orderB === -1 ? 999 : orderB)
          );

        });

      }


      /* =====================================
         6. REORDER VISIBLE ITEMS
      ===================================== */

      sortedItems.forEach(item => {
        archiveList.appendChild(item);
      });


      /* =====================================
         7. UPDATE RESULT COUNT
      ===================================== */

      if (resultCount) {

        const total = sortedItems.length;

        resultCount.textContent =
          `${total} record${total === 1 ? "" : "s"} displayed`;

      }


      /* =====================================
         8. EMPTY STATE
      ===================================== */

      if (emptyMessage) {

        emptyMessage.hidden =
          sortedItems.length !== 0;

      }

    }


    /* =====================================
       9. CONNECT FILTER CONTROLS
    ===================================== */

    if (categoryFilter) {
      categoryFilter.addEventListener(
        "change",
        filterArchive
      );
    }

    if (statusFilter) {
      statusFilter.addEventListener(
        "change",
        filterArchive
      );
    }

    if (sortFilter) {
      sortFilter.addEventListener(
        "change",
        filterArchive
      );
    }

    if (searchInput) {
      searchInput.addEventListener(
        "input",
        filterArchive
      );
    }


    /* =====================================
       10. RESET FILTERS
    ===================================== */

    if (resetButton) {

      resetButton.addEventListener("click", () => {

        if (categoryFilter) {
          categoryFilter.value = "all";
        }

        if (statusFilter) {
          statusFilter.value = "all";
        }

        if (sortFilter) {
          sortFilter.value = "default";
        }

        if (searchInput) {
          searchInput.value = "";
        }

        filterArchive();

      });

    }


    /* =====================================
       11. INITIAL FILTER DISPLAY
    ===================================== */

    filterArchive();

  });

}


/* =========================================
   12. START ARCHIVE FILTERING
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeArchiveFilters
);

/* =========================================
   NOCTURNE: THE VEIL NETWORK
   JAVASCRIPT BATCH 4
   THE RESEARCHER'S JOURNAL
========================================= */


/* =========================================
   1. STORAGE CONFIGURATION
========================================= */

const NOCTURNE_STORAGE = {
  bookmarks: "nocturne_bookmarks",
  notes: "nocturne_research_notes"
};


/* =========================================
   2. SAFE STORAGE FUNCTIONS
========================================= */

function getStoredData(key, fallback = []) {

  try {

    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : fallback;

  } catch (error) {

    console.error("NOCTURNE storage could not be read:", error);

    return fallback;

  }

}


function saveStoredData(key, data) {

  try {

    localStorage.setItem(key, JSON.stringify(data));

    return true;

  } catch (error) {

    console.error("NOCTURNE storage could not be saved:", error);

    return false;

  }

}


/* =========================================
   3. BOOKMARK DATABASE
========================================= */

function getNocturneBookmarks() {

  return getStoredData(NOCTURNE_STORAGE.bookmarks, []);

}


function saveNocturneBookmark(record) {

  const bookmarks = getNocturneBookmarks();

  const exists = bookmarks.some(
    item => item.id === record.id
  );

  if (exists) return false;

  bookmarks.push({
    ...record,
    savedAt: new Date().toISOString()
  });

  return saveStoredData(
    NOCTURNE_STORAGE.bookmarks,
    bookmarks
  );

}


function removeNocturneBookmark(id) {

  const bookmarks = getNocturneBookmarks();

  const updatedBookmarks = bookmarks.filter(
    item => item.id !== id
  );

  return saveStoredData(
    NOCTURNE_STORAGE.bookmarks,
    updatedBookmarks
  );

}


/* =========================================
   4. CREATE BOOKMARK BUTTONS
========================================= */

function initializeBookmarkButtons() {

  const bookmarkButtons = document.querySelectorAll(
    "[data-save-record]"
  );

  bookmarkButtons.forEach(button => {

    const record = {
      id: button.dataset.recordId,
      title: button.dataset.recordTitle,
      category: button.dataset.recordCategory || "Unclassified",
      description: button.dataset.recordDescription || "",
      url: button.dataset.recordUrl || ""
    };

    if (!record.id || !record.title) return;

    function updateButton() {

      const bookmarks = getNocturneBookmarks();

      const isSaved = bookmarks.some(
        item => item.id === record.id
      );

      button.textContent = isSaved
        ? "★ Saved to Journal"
        : "☆ Save to Journal";

      button.classList.toggle("saved", isSaved);

      button.setAttribute(
        "aria-pressed",
        String(isSaved)
      );

    }

    button.addEventListener("click", () => {

      const bookmarks = getNocturneBookmarks();

      const alreadySaved = bookmarks.some(
        item => item.id === record.id
      );

      if (alreadySaved) {

        removeNocturneBookmark(record.id);

      } else {

        saveNocturneBookmark(record);

      }

      updateButton();

      document.dispatchEvent(
        new CustomEvent("nocturneBookmarksChanged")
      );

    });

    updateButton();

  });

}


/* =========================================
   5. PERSONAL JOURNAL NOTES
========================================= */

function getNocturneNotes() {

  return getStoredData(NOCTURNE_STORAGE.notes, []);

}


function saveNocturneNote(note) {

  const notes = getNocturneNotes();

  notes.unshift({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `note-${Date.now()}-${Math.random()}`,
    title: note.title,
    category: note.category,
    content: note.content,
    createdAt: new Date().toISOString()
  });

  return saveStoredData(
    NOCTURNE_STORAGE.notes,
    notes
  );

}


function removeNocturneNote(id) {

  const notes = getNocturneNotes();

  const updatedNotes = notes.filter(
    note => note.id !== id
  );

  return saveStoredData(
    NOCTURNE_STORAGE.notes,
    updatedNotes
  );

}


/* =========================================
   6. JOURNAL NOTE FORM
========================================= */

function initializeResearchNoteForm() {

  const form = document.querySelector(
    "#researchNoteForm"
  );

  if (!form) return;

  const titleInput = form.querySelector(
    "#researchNoteTitle"
  );

  const categoryInput = form.querySelector(
    "#researchNoteCategory"
  );

  const contentInput = form.querySelector(
    "#researchNoteContent"
  );

  const feedback = document.querySelector(
    "#journalFeedback"
  );

  form.addEventListener("submit", event => {

    event.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const content = contentInput.value.trim();

    if (!title || !content) {

      if (feedback) {
        feedback.textContent =
          "A title and research note are required.";
      }

      return;

    }

    const saved = saveNocturneNote({
      title,
      category,
      content
    });

    if (!saved) {

      if (feedback) {
        feedback.textContent =
          "Your note could not be saved. Check your browser storage.";
      }

      return;

    }

    form.reset();

    if (feedback) {
      feedback.textContent =
        "Research note successfully recorded.";
    }

    renderResearchNotes();

  });

}


/* =========================================
   7. DISPLAY RESEARCH NOTES
========================================= */

function renderResearchNotes() {

  const container = document.querySelector(
    "#researchNotesList"
  );

  if (!container) return;

  const notes = getNocturneNotes();

  container.replaceChildren();

  if (notes.length === 0) {

    const empty = document.createElement("p");

    empty.className = "journal-empty";
    empty.textContent =
      "No research notes recorded yet. Your journal awaits its first entry.";

    container.appendChild(empty);

    return;

  }

  notes.forEach(note => {

    const article = document.createElement("article");
    article.className = "research-note-card";

    const category = document.createElement("p");
    category.className = "section-label";
    category.textContent = note.category;

    const heading = document.createElement("h3");
    heading.textContent = note.title;

    const content = document.createElement("p");
    content.className = "research-note-content";
    content.textContent = note.content;

    const date = document.createElement("small");

    date.textContent = new Date(
      note.createdAt
    ).toLocaleString();

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "Remove Note";

    deleteButton.addEventListener("click", () => {

      const confirmed = window.confirm(
        "Remove this research note from your journal?"
      );

      if (!confirmed) return;

      removeNocturneNote(note.id);

      renderResearchNotes();

    });

    article.append(
      category,
      heading,
      content,
      date,
      deleteButton
    );

    container.appendChild(article);

  });

}


/* =========================================
   8. DISPLAY SAVED RECORDS
========================================= */

function renderSavedRecords() {

  const container = document.querySelector(
    "#savedRecordsList"
  );

  if (!container) return;

  const bookmarks = getNocturneBookmarks();

  container.replaceChildren();

  if (bookmarks.length === 0) {

    const empty = document.createElement("p");

    empty.className = "journal-empty";
    empty.textContent =
      "No records have been bookmarked yet.";

    container.appendChild(empty);

    return;

  }

  bookmarks.forEach(record => {

    const article = document.createElement("article");

    article.className = "saved-record-card";

    const category = document.createElement("p");

    category.className = "section-label";
    category.textContent = record.category;

    const heading = document.createElement("h3");

    heading.textContent = record.title;

    const description = document.createElement("p");

    description.textContent = record.description;

    article.append(category, heading, description);

    if (record.url) {

      const link = document.createElement("a");

      link.href = record.url;
      link.textContent = "Open Record";

      article.appendChild(link);

    }

    const removeButton = document.createElement("button");

    removeButton.type = "button";
    removeButton.textContent = "Remove Bookmark";

    removeButton.addEventListener("click", () => {

      removeNocturneBookmark(record.id);

      renderSavedRecords();

      document.dispatchEvent(
        new CustomEvent("nocturneBookmarksChanged")
      );

    });

    article.appendChild(removeButton);

    container.appendChild(article);

  });

}


/* =========================================
   9. JOURNAL COUNTERS
========================================= */

function updateJournalCounters() {

  const bookmarkCount = getNocturneBookmarks().length;
  const noteCount = getNocturneNotes().length;

  document.querySelectorAll(
    "[data-bookmark-count]"
  ).forEach(element => {

    element.textContent = bookmarkCount;

  });

  document.querySelectorAll(
    "[data-note-count]"
  ).forEach(element => {

    element.textContent = noteCount;

  });

}


/* =========================================
   10. JOURNAL INITIALIZATION
========================================= */

function initializeResearchJournal() {

  initializeBookmarkButtons();

  initializeResearchNoteForm();

  renderResearchNotes();

  renderSavedRecords();

  updateJournalCounters();

  document.addEventListener(
    "nocturneBookmarksChanged",
    () => {

      renderSavedRecords();
      updateJournalCounters();

    }
  );

}

document.addEventListener(
  "DOMContentLoaded",
  initializeResearchJournal
);
