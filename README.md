# AngularOrganizer

Note: it is still under refactoring!

Simple organizer, based on Angular, MaterialUI.

Tasks, tags, drag-drop-list, import/export from/to JSON.

## List of "priorities".

Priority is a something like a long-term multitask.
You can:
* add new priority
* delete priority
* use drag and drop to change order in list
* auto save to local storage
* log of removed priorities

Priorities is an independent functionality, and it's not the same that the "tasks".

## Timers

You can create list of timers. Each timer has:
* label/name.
* length.
You can:
* run/stop timer.
* see how much time left.
* save list of timers.

## Tasks

Task has:
* title
* description
* date start
* date end
* task priority (it's a different priority)
* tags

Tags is simple strings, without whitespace.
Tasks are separate into columns, depend on tags.
You can define your columns.

Column has:
* title
* tags

So tasks are separate into columns:
* each column contain tasks with the same tags (at least one)
* special column contain not matched tasks

## Test data

You can use generation of test data.

Tasks are sorted by date, and highlighted accordingly to priority.

MIT license.
