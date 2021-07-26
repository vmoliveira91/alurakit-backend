-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "categoria_id" INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("categoria_id", "descricao", "id", "titulo", "url") SELECT coalesce("categoria_id", 1) AS "categoria_id", "descricao", "id", "titulo", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
