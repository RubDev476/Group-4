import AccordionPopulars from "./AccordionPopulars";

export default function AsideRight() {
    return (
        <aside className="right none scroll-bar-style">
            <div className="aside-card">
                <AccordionPopulars />
            </div>

            <div className="about-card">
                <span className="about-badge">myfeed</span>
                <h4 className="logo-font">Your feed, your topics</h4>
                <p>
                    Share freely across gaming, cinema, books, history, TV, and more — without random algorithms deciding what you see.
                </p>
            </div>
        </aside>
    )
}
