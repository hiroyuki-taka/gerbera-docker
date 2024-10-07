// doc-import-begin
function importAudio(obj, cont, rootPath, autoscanId, containerType) {
  return addAudio(obj, cont, rootPath, containerType)
}

function importAudioStructured(obj, cont, rootPath, autoscanId, containerType) {
  return addAudioStructured(obj, cont, rootPath, containerType)
}

//var titleRe = /^(?<year>[0-9]{4})(?<season>[0-4]Q) (?<title>.*)/
var titleRe = /^([0-9]{4})([0-4]Q) (.*)/
var subTitleRe = /^(\[.*]) #([0-9]+) (.*)-([0-9]{4})年([0-9]{2})月([0-9]{2})日([0-9]{2})時([0-9]{2})分(-.*)?\..*$/

function addMovieToAllLibrary(obj, container) {
  return addMovieToLibrary(obj, ["All"].concat(container))
}

/**
 *
 * @param obj {Orig}
 * @param year string
 * @param season string
 * @param container {string[]}
 */
function addMovieToSeasonLibrary(obj, year, season, container) {
  return addMovieToLibrary(obj, ["Season", year, season].concat(container))
}

function addMovieToInitialLibrary(obj, initial, container) {
  return addMovieToLibrary(obj, ["Initial", initial].concat(container))
}

function addMovieToMiscLibrary(obj, container) {
  return addMovieToLibrary(obj, ["Misc"].concat(container))
}

function addMovieToLibrary(obj, container) {
  var boxSetup = config["/import/scripting/virtual-layout/boxlayout/box"]
  var treeBase = [
    // root(Video)
    {
      id: boxSetup[BK_videoRoot].id,
      title: boxSetup[BK_videoRoot].title,
      objectType: OBJECT_TYPE_CONTAINER,
      upnpclass: UPNP_CLASS_CONTAINER,
      metaData: {
        M_CONTENT_CLASS: UPNP_CLASS_VIDEO_ITEM,
      },
    },
  ]
  var tree = treeBase.concat(
    container.map(function (p) {
      return { title: p, objectType: OBJECT_TYPE_CONTAINER, upnpclass: UPNP_CLASS_CONTAINER }
    })
  )

  print2("Info", "_tree2", JSON.stringify(tree))
  var containerTree = addContainerTree(tree)
  print2("Info", "_container", containerTree)
  return addCdsObject(obj, containerTree)
}

/**
 *
 * @param obj {Orig}
 * @param cont {Orig}
 * @param rootPath {string}
 * @param autoscanId {number}
 * @param containerType {string}
 */
function _importVideo(obj, cont, rootPath, autoscanId, containerType) {
  if (!obj.location.endsWith(".mp4")) {
    return
  }

  try {
    print2(
      "Info",
      "_importVideo",
      "obj",
      JSON.stringify(obj, null, 2),
      "cont",
      JSON.stringify(cont, null, 2),
      rootPath,
      autoscanId,
      containerType
    )

    var _obj = Object.assign({}, obj)
    _obj.refID = obj.id
    var upnpClass = obj.upnpclass

    var result = []
    if (rootPath.startsWith("/srv/movie2")) {
      var pathFragment = obj.location.split("/").splice(3)
      print2("Info", "_movie2", pathFragment)

      // ファイル名の1つ親
      var titleBase = pathFragment.slice(-2, -1)[0]
      // ファイル名
      var filename = pathFragment.slice(-1)[0]
      // ファイル名の2つ親以上
      var parentsDirectory = pathFragment.slice(1, -2)

      var titleFound = titleRe.exec(titleBase)
      var subTitleFound = subTitleRe.exec(filename)
      print2("Info", "_titleFound", JSON.stringify(titleFound))
      print2("Info", "_subTitleFound", JSON.stringify(subTitleFound))

      switch (pathFragment[0]) {
        case "All":
          ;(function () {
            if (titleFound && subTitleFound) {
              var year = titleFound[1]
              var season = titleFound[2]
              var title = titleFound[3]
              var ch = subTitleFound[1]
              var count = subTitleFound[2]
              var subTitle = subTitleFound[3]
              var bcYear = subTitleFound[4]
              var bcMonth = subTitleFound[5]
              var bcDay = subTitleFound[6]
              var bcHour = subTitleFound[7]
              var bcMinutes = subTitleFound[8]
              var cmFlag = !!subTitleFound[9]

              _obj.title = "".concat(ch, " #", count, " ", subTitle)
              _obj.metaData["dc:date"] = "".concat(
                [bcYear, bcMonth, bcDay].join("-"),
                "T",
                [bcHour, bcMinutes, "00"].join(":"),
                "+0900"
              )

              var allContainer = [].concat(parentsDirectory).concat("".concat(year, season, " ", title))
              if (cmFlag) {
                allContainer.push("CM")
                _obj.title = _obj.title.concat(subTitleFound[9])
              }

              result.push(addMovieToAllLibrary(_obj, allContainer))

              // season
              var seasonContainer = [title]
              if (cmFlag) {
                seasonContainer.push("CM")
              }

              result.push(addMovieToSeasonLibrary(_obj, year, season, seasonContainer))
            } else {
              // 親ディレクトリ、ファイル名が規定通りではない場合
              result.push(addMovieToMiscLibrary(_obj, [].concat(parentsDirectory).concat([titleBase])))
            }
          })()
          break
        case "Initial":
          var initial = pathFragment[1]
          if (titleFound && subTitleFound) {
            ;(function () {
              var year = titleFound[1]
              var season = titleFound[2]
              var title = titleFound[3]
              var ch = subTitleFound[1]
              var count = subTitleFound[2]
              var subTitle = subTitleFound[3]
              var bcYear = subTitleFound[4]
              var bcMonth = subTitleFound[5]
              var bcDay = subTitleFound[6]
              var bcHour = subTitleFound[7]
              var bcMinutes = subTitleFound[8]
              var cmFlag = !!subTitleFound[9]

              _obj.title = "".concat(ch, " #", count, " ", subTitle)
              _obj.metaData["dc:date"] = "".concat(
                [bcYear, bcMonth, bcDay].join("-"),
                "T",
                [bcHour, bcMinutes, "00"].join(":"),
                "+0900"
              )

              var initialContainer = [title]
              if (cmFlag) {
                initialContainer.push("cm")
                _obj.title = _obj.title.concat(subTitleFound[9])
              }

              result.push(addMovieToInitialLibrary(_obj, initial, initialContainer))
            })()
          } else {
            // 親ディレクトリ、ファイル名が規定通りではない場合
            result.push(addMovieToMiscLibrary(_obj, [].concat(parentsDirectory).concat([titleBase])))
          }

          break
      }
    } else if (rootPath.startsWith("/srv/movie_recorded/out")) {
      var pathFragment = obj.location.split("/").splice(5)
      var outRe =
        /^(\[.*])-(.*?)( #.*)?-([0-9]{4})年([0-9]{2})月([0-9]{2})日([0-9]{2})時([0-9]{2})分(_div([0-9]+))?(-.*)?\..*$/

      // ファイル名
      var filename = pathFragment.slice(-1)[0]

      print2("Info", "_out", pathFragment, filename)

      var outFound = outRe.exec(filename)

      if (outFound) {
        print2("Info", "_out2", outFound)
        ;(function () {
          var ch = outFound[1]
          var title = outFound[2]
          var count = outFound[3] || ""
          var bcYear = outFound[4]
          var bcMonth = outFound[5]
          var bcDay = outFound[6]
          var bcHour = outFound[7]
          var bcMinutes = outFound[8]
          var div = outFound[9] || ""
          var divCount = outFound[10] || ""
          var flag = outFound[11] || ""

          _obj.title = "".concat(ch, " ", title, count)
          if (div) {
            _obj.title = _obj.title.concat("+", divCount, flag)
          } else {
            _obj.title = _obj.title.concat(flag)
          }
          _obj.metaData["dc:date"] = "".concat(
            [bcYear, bcMonth, bcDay].join("-"),
            "T",
            [bcHour, bcMinutes, "00"].join(":"),
            "+0900"
          )
          var container = ["Out"]

          if (pathFragment.length > 1) {
            container = container.concat(pathFragment.slice(0, -1))
          } else {
            container = container.concat(title)
          }
          result.push(addMovieToMiscLibrary(_obj, container))
        })()
      }
    }
    return result
  } catch (e) {
    print2("Error", e)
    return []
  }
}

function importImage(obj, cont, rootPath, autoscanId, containerType) {
  return addImage(obj, cont, rootPath, containerType)
}

// doc-import-end
