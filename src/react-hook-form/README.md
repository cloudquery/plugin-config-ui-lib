# react-hook-form export

There were difficulties in matching the react-hook-form version between the library and consuming applications. But more concerningingly - the use of FormContext (or React Context, for that matter) was untenable.

We resolved these issues by installing a single version of react-hook-form in the library and passing needed components and hooks through to the consuming applications.

[Credit](https://github.com/orgs/react-hook-form/discussions/3894#discussioncomment-6966640)
