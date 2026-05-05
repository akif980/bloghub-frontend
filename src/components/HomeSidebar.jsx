function HomeSidebar() {
  return (
    <>
      <div className="sidebar-card">
        <h3>About BlogHub</h3>
        <p className="empty-text">
          BlogHub is a clean and modern blogging platform UI where readers can
          explore posts and writers can share ideas beautifully.
        </p>
      </div>

      <div className="sidebar-card">
        <h3>Popular Topics</h3>
        <ul className="sidebar-list">
          <li>
            <strong>React</strong> frontend ideas and reusable components
          </li>
          <li>
            <strong>Design</strong> layout, spacing, and typography
          </li>
          <li>
            <strong>Writing</strong> content structure and presentation
          </li>
        </ul>
      </div>

      <div className="sidebar-card">
        <h3>Quick Stats</h3>
        <ul className="sidebar-list">
          <li>
            <strong>Posts:</strong> 3
          </li>
          <li>
            <strong>Authors:</strong> 3
          </li>
          <li>
            <strong>Comments:</strong> 3
          </li>
        </ul>
      </div>
    </>
  );
}

export default HomeSidebar;
