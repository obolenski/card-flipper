import {
  CategoryIconMisc,
  CategoryIconNumbers,
  CategoryIconShop,
  CategoryIconTransport,
} from "../components/Icons.tsx";
import CollapsibleNavGroup from "../components/Layout/CollapsibleNavGroup.tsx";
import { cardCategories as allCategories } from "../utils/cardCategories.ts";

export default function CategoriesCollapsible() {
  return (
    <CollapsibleNavGroup
      startExpanded={allCategories.includes(
        window.location?.pathname.split("?")[0].split("/").pop() ??
          "",
      )}
      title="Categories"
      links={[{
        href: "/tables/Numbers",
        text: "Numbers",
        icon: <CategoryIconNumbers />,
      }, {
        href: "/tables/Shop",
        text: "Shop",
        icon: <CategoryIconShop />,
      }, {
        href: "/tables/Transportation",
        text: "Transportation",
        icon: <CategoryIconTransport />,
      }, {
        href: "/tables/Other",
        text: "Other",
        icon: <CategoryIconMisc />,
      }]}
    />
  );
}
