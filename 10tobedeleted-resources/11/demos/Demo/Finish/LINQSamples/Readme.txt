To run this project in Visual Studio 2019, open the LINQSample.sln
To run this project in Visual Studio Code, open the folder \LINQSamples

SampleViewModel Samples
--------------------------------------------------
DeferredExecution() - Illustrate the concept of LINQ deferred execution using foreach and the GetEnumerator() method
FilterUsingSimpleGenericFilter() - Create a generic filter to illustrate how NOT to write a filter
FilterUsingWhereTake() - Use the Where() expression with Take(1) and you see very different results from using the simple generic filter.
FilterUsingSimpleGenericFilterTake() - Add Take(1) to simple generic filter and compare to using Where() and Take(1)
UsingYield() - The correct way to write a generic filter is to use the 'yield' keyword
UsingYieldAndTake() - Apply the Take(1) expression to your custom filter using 'yield'
UsingOrderBy() - Adding the OrderBy() forces one complete iteration through collection to sort the data before the filtering can happen


Streaming vs. Non-Streaming Expressions
--------------------------------------------------
Streaming: Concat(), Except(), GroupJoin, Intersect, Join, OfType, Range, Repeat, Select, SelectMany, Skip, SkipWhile, Take, TakeWhile, Union, Where
Non-Streaming: Except, GroupBy, GroupJoin, Intersect, Join, OrderBy, OrderByDescending, Reverse, ThenBy, ThenByDescending

For those methods that are in both lists, they will be evaluated in a streaming manner first