# Introduction

The carbonmark-data project aims to display in a user friendly manner On-Chain and Off-Chain Carbon metrics.
Those metrics are provided

# Code organisation

The data processing is organized into layers that are (more or less) isolated from a code standpoint.

- Data Fetching: `lib/charts/queries.ts`
  Configurable queries to dash-api endoints

- Data Preparation: `lib/charts/aggregators`
  Aggregators that use queries to fetch data and prepare them in a form usable by charts

- Charts: `components/charts`
  The charts themselves. - The chart use custom components and helpers located in `components/charts/helpers`

- Cards: `components/cards`
  The cards should inherit from `OverviewCard`. This helps maintaing a standard layout.

- Pages: `app`

# Understanding the ChartConfiguration type

The chartConfiguration type is a generic type that takes 3 parameters:

- Q: The query type - Describes the arguments that will be sent to the API
- M: The mapping type - Describes how to map data sent by the API into data usable by Recharts
- T: The id type - The type of the id value used to identify the rechart dataset (exemple Bridges)

# Creating new Cards

When creating new Cards the following should be done:

- Create a Query if it does not exist in `lib/charts/queries`
  - Create typings for the query response if they does not exist in `lib/charts/types`
- Create an Aggregator `lib/charts/aggregators`
  - Create typings for the dataset if it does not exist in `lib/charts/types`
- Create a Chart component in `components/charts`
  - Create new helper components if necessary in `components/charts/helpers`
- Create a Card component in `components/cards`
  - You may need to create new Options in `lib/charts/options` for your OptionsSwitcher

See `components/charts/VerraCreditsChart` for an example
