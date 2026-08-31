import AGBox from "@/3.Theme/0.Atoms/AGBox";
import type { LicenseSearchResultItem } from "../Interfaces/SearchResults";

interface SearchResultsBarProps {
  total: number;
  results: LicenseSearchResultItem[];
  pagination: {
    page: number;
    limit: number;
    onPageChange: (newPage: number) => void;
  };
  select: (id: number) => void;
}

const SearchResultsDropdown: React.FC<SearchResultsBarProps> = ({
  total,
  results,
  select,
}) => (
  <AGBox>
    <p>Total results: {total}</p>
    <ul>
      {results.map((license) => (
        <AGBox key={license.id} onClick={() => select(license.id)}>
          <li>
            {license.name} - {license.email} - {license.businessName}
          </li>
        </AGBox>
      ))}
    </ul>
  </AGBox>
);

export default SearchResultsDropdown;
