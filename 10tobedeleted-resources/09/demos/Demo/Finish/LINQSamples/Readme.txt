To run this project in Visual Studio 2019, open the LINQSample.sln
To run this project in Visual Studio Code, open the folder \LINQSamples

SampleViewModel Samples
--------------------------------------------------
GroupBy() - Group all products by size.
GroupByIntoSelect() - Same as GroupBy just uses the 'into' keyword.
GroupByOrderBy() - Order by the 'Key' property
GroupByWhere() - Search for those sizes with 2 or more products. Simulates a SQL HAVING clause.
GroupedSubquery() - Group Sales by SalesOrderID, add Products into new Sales Order object using a subquery.
DistinctUsingGroupByFirstOrDefault() - The Distinct() operator can be simulated using the GroupBy() and FirstOrDefault() operators