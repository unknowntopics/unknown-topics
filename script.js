const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

const searchable = [...document.querySelectorAll("[data-search]")];

function doSearch() {
  if (!searchInput || !searchMessage) return;

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchable.forEach(item => item.classList.remove("hidden"));
    searchMessage.textContent = "কোনো keyword লিখে Search করুন।";
    return;
  }

  let found = 0;

  searchable.forEach(item => {
    const text = (item.dataset.search || "").toLowerCase();
    const match = text.includes(query);

    item.classList.toggle("hidden", !match);

    if (match) found++;
  });

  searchMessage.textContent = found
    ? `${found}টি matching result পাওয়া গেছে।`
    : "কোনো matching result পাওয়া যায়নি।";

  if (found) {
    const firstResult = document.querySelector(".searchable");

    if (firstResult) {
      firstResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", doSearch);
}

if (searchInput) {
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      doSearch();
    }
  });
}
