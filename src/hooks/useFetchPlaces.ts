import { useState, useEffect } from "react";
import axios from "axios";
import { Location, PlaceSearchResponse } from "@/schemas/schemas";

export function useFetchPlaces(lat: number, lng: number) {
  const [places, setPlaces] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const relevantCategories = [
    "10000",
    "10001",
    "10002",
    "10003",
    "10004",
    "10005",
    "10006",
    "10007",
    "10008",
    "10009",
    "10010",
    "10011",
    "10012",
    "10013",
    "10014",
    "10015",
    "10016",
    "10017",
    "10018",
    "10019",
    "10020",
    "10021",
    "10022",
    "10023",
    "10024",
    "10025",
    "10026",
    "10027",
    "10028",
    "10029",
    "10030",
    "10031",
    "10032",
    "10033",
    "10034",
    "10035",
    "10036",
    "10037",
    "10038",
    "10039",
    "10040",
    "10041",
    "10042",
    "10043",
    "10044",
    "10045",
    "10046",
    "10047",
    "10048",
    "10049",
    "10050",
    "10051",
    "10052",
    "10053",
    "10054",
    "10055",
    "10056",
    "10057",
    "10058",
    "10059",
    "10060",
    "10061",
    "10062",
    "10063",
    "10064",
    "10065",
    "10066",
    "10067",
    "10068",
    "10069",
    "11035",
    "11036",
    "12114",
    "13000",
    "13001",
    "13002",
    "13003",
    "13004",
    "13005",
    "13006",
    "13007",
    "13008",
    "13009",
    "13010",
    "13011",
    "13012",
    "13013",
    "13014",
    "13015",
    "13016",
    "13017",
    "13018",
    "13019",
    "13020",
    "13021",
    "13022",
    "13023",
    "13024",
    "13025",
    "13026",
    "13027",
    "13028",
    "13029",
    "13030",
    "13031",
    "13032",
    "13033",
    "13034",
    "13035",
    "13036",
    "13037",
    "13038",
    "13039",
    "13040",
    "13041",
    "13042",
    "13043",
    "13044",
    "13045",
    "13046",
    "13047",
    "13048",
    "13049",
    "13050",
    "13051",
    "13052",
    "13053",
    "13054",
    "13055",
    "13056",
    "13057",
    "13058",
    "13059",
    "13060",
    "13061",
    "13062",
    "13063",
    "13064",
    "13065",
    "13066",
    "13067",
    "13068",
    "13069",
    "13070",
    "13071",
    "13072",
    "13073",
    "13074",
    "13075",
    "13076",
    "13077",
    "13078",
    "13079",
    "13080",
    "13081",
    "13082",
    "13083",
    "13084",
    "13085",
    "13086",
    "13087",
    "13088",
    "13089",
    "13090",
    "13091",
    "13092",
    "13093",
    "13094",
    "13095",
    "13096",
    "13097",
    "13098",
    "13099",
    "13100",
    "13101",
    "13102",
    "13103",
    "13104",
    "13105",
    "13106",
    "13107",
    "13108",
    "13109",
    "13110",
    "13111",
    "13112",
    "13113",
    "13114",
    "13115",
    "13116",
    "13117",
    "13118",
    "13119",
    "13120",
    "13121",
    "13122",
    "13123",
    "13124",
    "13125",
    "13126",
    "13127",
    "13128",
    "13129",
    "13130",
    "13131",
    "13132",
    "13133",
    "13134",
    "13135",
    "13136",
    "13137",
    "13138",
    "13139",
    "13140",
    "13141",
    "13142",
    "13143",
    "13144",
    "13145",
    "13146",
    "13147",
    "13148",
    "13149",
    "13150",
    "13151",
    "13152",
    "13153",
    "13154",
    "13155",
    "13156",
    "13157",
    "13158",
    "13159",
    "13160",
    "13161",
    "13162",
    "13163",
    "13164",
    "13165",
    "13166",
    "13167",
    "13168",
    "13169",
    "13170",
    "13171",
    "13172",
    "13173",
    "13174",
    "13175",
    "13176",
    "13177",
    "13178",
    "13179",
    "13180",
    "13181",
    "13182",
    "13183",
    "13184",
    "13185",
    "13186",
    "13187",
    "13188",
    "13189",
    "13190",
    "13191",
    "13192",
    "13193",
    "13194",
    "13195",
    "13196",
    "13197",
    "13198",
    "13199",
    "13200",
    "13201",
    "13202",
    "13203",
    "13204",
    "13205",
    "13206",
    "13207",
    "13208",
    "13209",
    "13210",
    "13211",
    "13212",
    "13213",
    "13214",
    "13215",
    "13216",
    "13217",
    "13218",
    "13219",
    "13220",
    "13221",
    "13222",
    "13223",
    "13224",
    "13225",
    "13226",
    "13227",
    "13228",
    "13229",
    "13230",
    "13231",
    "13232",
    "13233",
    "13234",
    "13235",
    "13236",
    "13237",
    "13238",
    "13239",
    "13240",
    "13241",
    "13242",
    "13243",
    "13244",
    "13245",
    "13246",
    "13247",
    "13248",
    "13249",
    "13250",
    "13251",
    "13252",
    "13253",
    "13254",
    "13255",
    "13256",
    "13257",
    "13258",
    "13259",
    "13260",
    "13261",
    "13262",
    "13263",
    "13264",
    "13265",
    "13266",
    "13267",
    "13268",
    "13269",
    "13270",
    "13271",
    "13272",
    "13273",
    "13274",
    "13275",
    "13276",
    "13277",
    "13278",
    "13279",
    "13280",
    "13281",
    "13282",
    "13283",
    "13284",
    "13285",
    "13286",
    "13287",
    "13288",
    "13289",
    "13290",
    "13291",
    "13292",
    "13293",
    "13294",
    "13295",
    "13296",
    "13297",
    "13298",
    "13299",
    "13300",
    "13301",
    "13302",
    "13303",
    "13304",
    "13305",
    "13306",
    "13307",
    "13308",
    "13309",
    "13310",
    "13311",
    "13312",
    "13313",
    "13314",
    "13315",
    "13316",
    "13317",
    "13318",
    "13319",
    "13320",
    "13321",
    "13322",
    "13323",
    "13324",
    "13325",
    "13326",
    "13327",
    "13328",
    "13329",
    "13330",
    "13331",
    "13332",
    "13333",
    "13334",
    "13335",
    "13336",
    "13337",
    "13338",
    "13339",
    "13340",
    "13341",
    "13342",
    "13343",
    "13344",
    "13345",
    "13346",
    "13347",
    "13348",
    "13349",
    "13350",
    "13351",
    "13352",
    "13353",
    "13354",
    "13355",
    "13356",
    "13357",
    "13358",
    "13359",
    "13360",
    "13361",
    "13362",
    "13363",
    "13364",
    "13365",
    "13366",
    "13367",
    "13368",
    "13369",
    "13370",
    "13371",
    "13372",
    "13373",
    "13374",
    "13375",
    "13376",
    "13377",
    "13378",
    "13379",
    "13380",
    "13381",
    "13382",
    "13383",
    "13384",
    "13386",
    "13387",
    "13388",
    "13389",
    "13390",
    "13392",
    "14003",
    "14004",
    "14005",
    "14006",
    "14007",
    "14016",
    "16000",
    "16001",
    "16002",
    "16003",
    "16004",
    "16005",
    "16006",
    "16007",
    "16008",
    "16009",
    "16010",
    "16011",
    "16012",
    "16013",
    "16014",
    "16015",
    "16016",
    "16017",
    "16018",
    "16019",
    "16020",
    "16021",
    "16022",
    "16023",
    "16024",
    "16025",
    "16026",
    "16027",
    "16028",
    "16029",
    "16030",
    "16031",
    "16032",
    "16033",
    "16034",
    "16035",
    "16036",
    "16037",
    "16038",
    "16039",
    "16040",
    "16041",
    "16042",
    "16043",
    "16044",
    "16045",
    "16046",
    "16047",
    "16048",
    "16049",
    "16050",
    "16051",
    "16052",
    "16053",
    "16054",
    "16055",
    "16056",
    "16057",
    "16058",
    "16059",
    "16060",
    "16061",
    "16062",
    "16063",
    "16064",
    "16065",
    "16066",
    "16067",
    "16068",
    "16069",
    "16070",
    "18055",
    "19020",
    "19025",
    "19028",
    "19029",
  ];

  const relevantFields = [
    "fsq_id",
    "name",
    "categories",
    "chains",
    "distance",
    "price",
    "description",
    "hours",
    "rating",
    "popularity",
    "photos",
    "tips",
    "website",
    "tel",
    "location",
    "geocodes",
  ];
  const categoriesQuery = relevantCategories.join(",");
  const fieldsQuery = relevantFields.join(",");
  const apiUrl = `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=1000&categories=${categoriesQuery}&limit=50&exclude_all_chains=true&fields=${fieldsQuery}&open_now=true`;

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<PlaceSearchResponse>(apiUrl, {
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
          },
        });

        const transformedPlaces: Location[] = response.data.results.map(
          (place) => ({
            categories: place.categories,
            chains: place.chains,
            distance: place.distance,
            price: place.price,
            description: place.description,
            hours: place.hours,
            rating: place.rating,
            popularity: place.popularity,
            photos: place.photos,
            tips: place.tips,
            website: place.website,
            tel: place.tel,
            fsq_id: place.fsq_id,
            name: place.name,
            geocodes: place.geocodes,
            location: {
              address: place.location.address,
              city: place.location.city,
              state: place.location.state,
              country: place.location.country,
              postcode: place.location.postcode,
              region: place.location.region,
              formattedAddress: place.location.formattedAddress,
            },
          })
        );

        setPlaces(transformedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to fetch places. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (lat && lng) {
      fetchPlaces();
    }
  }, [lat, lng]);

  return { places, isLoading, error };
}
