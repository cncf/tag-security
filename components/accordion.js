import { useState } from 'react';

const Accordion = ({ categories, level, isOpen }) => {
    return (
      <ul className={`accordion--level-${level} accordion--${isOpen ? 'open' : 'closed'}`}>
        {categories.map((category) => (
          <AccordionSection category={category} level={level} />
        ))}
      </ul>
    );
  };
  const AccordionSection = ({ category, level }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubLevel = !!category.subCategories;
    return (
      <li>
        {hasSubLevel ? (
          <>
            <button type="button" onClick={() => setIsOpen((isOpen) => !isOpen)}>
              {category.name}
            </button>
            <Accordion categories={category.subCategories} level={level + 1} isOpen={isOpen} />
          </>
        ) : (
          <Link href={category.slug}>{category.name}</Link>
        )}
      </li>
    );
  };