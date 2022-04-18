To run this project in Visual Studio 2019, open the LINQSample.sln
To run this project in Visual Studio Code, open the folder \LINQSamples

SampleViewModel Samples
--------------------------------------------------
SequenceEqualIntegers() - SequenceEqual() compares two different collections to see if they are equal
SequenceEqualProducts() - When using a collection of objects, SequenceEqual() performs a comparison to see if the two object references point to the same object
SequenceEqualUsingComparer() - Use an EqualityComparer class to determine if the objects are the same based on the values in properties
ExceptIntegers() - Except() finds all values in one list that are not in the other list
Except() - Except() finds all products in one list that are not in the other list using a comparer class
Intersect() - Intersect() finds all products that are in common between two collections using a comparer class
Union() - Union() combines two lists together, but skips duplicates by using a comparer class. This is like the UNION SQL operator.
LINQConcat() - The LINQ Concat() operator combines two lists together, but does NOT check for duplicates