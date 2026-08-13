import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, MessageSquare, Pin, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useNavigate } from "react-router-dom";
import { useQuestions } from "@/hooks/useQuestions";

const RecentPosts = () => {
    const navigate = useNavigate();

    const { questions, loading, fetchQuestionsFromMyChannels } = useQuestions();
    const QUESTIONS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
     useEffect(() => {
       fetchQuestionsFromMyChannels();
     }, []);
     // Pagination logic
     const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

     const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;

     const endIndex = startIndex + QUESTIONS_PER_PAGE;

     const currentQuestions = questions.slice(startIndex, endIndex);

     // Handle page change
     const changePage = (page) => {
       setCurrentPage(page);

       window.scrollTo({
         top: 0,
         behavior: "smooth",
       });
     };
  return (
    <Card className="card-shadow">
      {/* ======================================
          Header
      ======================================= */}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Questions From My Channels
        </CardTitle>

        <CardDescription>
          View and manage questions posted in your channels
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* ======================================
            Loading
        ======================================= */}

        {loading && (
          <div className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />

            <p className="text-sm text-muted-foreground">
              Loading questions...
            </p>
          </div>
        )}

        {/* ======================================
            Empty state
        ======================================= */}

        {!loading && questions.length === 0 && (
          <div className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

            <h3 className="font-semibold text-lg mb-1">No questions yet</h3>

            <p className="text-sm text-muted-foreground">
              Students haven't posted any questions in your channels yet.
            </p>
          </div>
        )}

        {/* ======================================
            Questions
        ======================================= */}

        {!loading && currentQuestions.length > 0 && (
          <>
            <div className="space-y-4">
              {currentQuestions.map((post) => (
                <div
                  key={post.question_id}
                  className="border border-border/60 rounded-lg p-4 space-y-4 hover:bg-muted/30 transition-colors"
                >
                  {/* ==============================
                      Question information
                  =============================== */}

                  <div className="space-y-3">
                    {/* Channel + user + date */}

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Channel */}

                      <Badge variant="outline" className="text-xs">
                        {post.channels?.name || "Unknown Channel"}
                      </Badge>

                      {/* Student */}

                      <span className="text-sm text-muted-foreground">
                        by{" "}
                        <span className="text-foreground">
                          {post.users?.full_name || "Unknown User"}
                        </span>
                      </span>

                      {/* Date */}

                      <span className="text-sm text-muted-foreground">•</span>

                      <span className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleString()}
                      </span>
                    </div>

                    {/* Question */}

                    <h3
                      className="font-semibold text-base cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`/question/${post.question_id}`)}
                    >
                      {post.question}
                    </h3>

                    {/* Description */}

                    {post.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    )}

                    {/* Tags */}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={`${tag}-${index}`}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* =================================
                      Actions
                  ================================== */}

                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pin className="w-3 h-3 mr-1" />
                      Pin
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Best Answer
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* ======================================
                Pagination
            ======================================= */}

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {/* Previous */}

                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          if (currentPage > 1) {
                            changePage(currentPage - 1);
                          }
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {/* Page numbers */}

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();

                            changePage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {/* Next */}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          if (currentPage < totalPages) {
                            changePage(currentPage + 1);
                          }
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* Page information */}

                <p className="text-center text-xs text-muted-foreground mt-3">
                  Showing {startIndex + 1}–
                  {Math.min(endIndex, questions.length)} of {questions.length}{" "}
                  questions
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentPosts