# TODO: Implement Image Carousel in Holiday Component

- [ ] Import useState from React
- [ ] Add state for startIndices (object to track start index per continent)
- [ ] Initialize startIndices with 0 for each continent key
- [ ] Modify JSX to map over all continents instead of just conticnents[0]
- [ ] For each continent, slice images to show only 3 at a time
- [ ] Add position: 'relative' to images container
- [ ] Reposition button inside images container with absolute positioning (right: -22px, top: 50%, transform: translateY(-50%))
- [ ] Add onClick handler to button to advance startIndex (loop back to 0)
- [ ] Remove button from outside the images container
- [ ] Test carousel functionality
