import React from "react";

export const CountrySelect = ({ value, onChange, className }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags")
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">Select country</option>
      {countries.map((country) => (
        <option key={country.cca2} value={country.cca2}>
          {country.flags.emoji} {country.name.common}
        </option>
      ))}
    </Select>
  );
};
